import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { ADD, clientSearch, EDIT } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { initForm, supervisingECEInput, techniciansInput } from '../../radio-dealer-shared';
import { RadioDealerService } from '../../radio-dealer.service';

@Component({
  selector: 'app-radio-dealer-edit',
  templateUrl: './radio-dealer-edit.component.html',
  styleUrls: ['./radio-dealer-edit.component.css'],
})
export class RadioDealerEditComponent implements OnInit {
  form: FormGroup;
  formId: string;
  formMode = ADD;
  clientName = '';

  faCalendarAlt = faCalendarAlt;

  getDestroyed = new Subject();

  constructor(
    private radioDealerService: RadioDealerService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params
      .pipe(
        map((params: Params) => {
          console.log(this.router.url);
          return params.id;
        }),
        takeUntil(this.getDestroyed)
      )
      .subscribe({
        next: (value) => {
          this.formId = value;
          this.formMode = value ? EDIT : ADD;
        },
      });

    this.clientService.selectedEntry.pipe(takeUntil(this.getDestroyed)).subscribe({
      next: (response) => {
        this.form.patchValue({ clientId: response.id });
        this.clientName = response.name;
        this.cd.detectChanges();
      },
    });

    if (this.formMode === EDIT) {
      const fetchedValue = this.radioDealerService.getSelectedEntry(this.formId);
      fetchedValue.supervisingECE.forEach(() => {
        this.addSupervisingECE();
      });
      fetchedValue.radioTechnicians.forEach(() => {
        this.addTechnicians();
      });
      this.clientName = fetchedValue.clientName;
      this.form.patchValue({ ...fetchedValue });
      this.radioDealerService.resourceType.next(EDIT);
    } else {
      this.radioDealerService.resourceType.next(ADD);
    }
  }

  initForm(): void {
    this.form = initForm();
  }

  submit(): void {
    console.log(this.form.value);
    if (this.formMode === ADD) {
      this.radioDealerService
        .addOne(this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: (res) => {
            console.log('OK');
          },
          error: (err) => {
            console.error(err);
          },
        });
    } else {
      this.radioDealerService
        .updateOne(this.formId, this.form.value)
        .pipe(takeUntil(this.getDestroyed))
        .subscribe({
          next: (res) => {
            console.log('OK');
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }

  addSupervisingECE(): void {
    this.supervisingECE.push(supervisingECEInput());
  }

  addTechnicians() {
    this.radioTechnicians.push(techniciansInput());
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.componentName = clientSearch;
  }

  get supervisingECE(): FormArray {
    return this.form.get('supervisingECE') as FormArray;
  }

  get radioTechnicians(): FormArray {
    return this.form.get('radioTechnicians') as FormArray;
  }
}
