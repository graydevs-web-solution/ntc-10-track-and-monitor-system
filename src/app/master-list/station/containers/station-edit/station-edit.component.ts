import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ADD, EDIT } from 'src/app/shared/constants';
import { StationService } from '../../station.service';

@Component({
  selector: 'app-station-edit',
  templateUrl: './station-edit.component.html',
  styleUrls: ['./station-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formMode = ADD;
  formId: string;

  saveStationSubs: Subscription;
  viewStationSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private stationService: StationService,
    private activeModal: NgbActiveModal,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.saveStationSubs = this.stationService.saveStationListener.subscribe({
      next: () => {
        this.submit();
      },
    });
    this.viewStationSubs = this.stationService.selectedEntry.subscribe({
      next: (value) => {
        this.formMode = EDIT;
        this.formId = value.id;
        this.form.patchValue(value);
        this.cd.detectChanges();
      },
    });
  }

  ngOnDestroy(): void {
    this.saveStationSubs.unsubscribe();
    this.viewStationSubs.unsubscribe();
  }

  initForm(): void {
    this.form = this.fb.group({
      nameOfStation: [''],
      officePostalAddress: [''],
      exactLocationOfStation: [''],
      class: [''],
      natureOfService: [''],
      workingHours: [''],
    });
  }

  submit(): void {
    if (this.formMode === ADD) {
      this.stationService.addOne(this.form.value);
    } else {
      this.stationService.updateOne(this.formId, this.form.value);
    }
    this.activeModal.close();
  }
}
