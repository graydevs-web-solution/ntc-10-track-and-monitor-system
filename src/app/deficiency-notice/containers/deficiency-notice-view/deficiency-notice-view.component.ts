import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { faCalendarAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ClientService } from 'src/app/master-list/clients/client.service';
import { VIEW } from 'src/app/shared/constants';
import { formatDate } from 'src/app/shared/utility';
import { initForm, transmitterInput, violations } from '../../deficiency-notice-shared';
import { DeficiencyNoticeService } from '../../deficiency-notice.service';
import { DeficiencyNotice } from '../../models/deficiency-notice.model';
import { ViolationsType } from '../../models/violations.model';

@Component({
  selector: 'app-deficiency-notice-view',
  templateUrl: './deficiency-notice-view.component.html',
  styleUrls: ['./deficiency-notice-view.component.css'],
})
export class DeficiencyNoticeViewComponent implements OnInit {
  form: FormGroup;
  formId: string;
  formMode = VIEW;
  clientName = '';

  faCalendarAlt = faCalendarAlt;
  faFilePdf = faFilePdf;

  getDestroyed = new Subject();

  violations: ViolationsType[] = [...violations];

  constructor(
    private dnService: DeficiencyNoticeService,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params
      .pipe(
        map((params: Params) => params.id),
        takeUntil(this.getDestroyed)
      )
      .subscribe({
        next: (value) => {
          this.formId = value;
        },
      });
    const fetchedValue = this.dnService.getSelectedEntry(this.formId);
    for (const _ of fetchedValue.transmitters || []) {
      this.addTransmitterInput();
    }
    this.clientName = fetchedValue.clientName;
    const vals: DeficiencyNotice = {
      ...fetchedValue,
      date: formatDate(fetchedValue.date, false),
      dateOfDeficiencyHearing: formatDate(fetchedValue.dateOfDeficiencyHearing, false),
    };
    this.form.patchValue(vals);
    this.dnService.resourceType.next(VIEW);
  }

  initForm(): void {
    this.form = initForm();
  }

  addTransmitterInput() {
    this.transmitters.push(transmitterInput());
  }

  get transmitters() {
    return this.form.get('transmitters') as FormArray;
  }

  generatePdf(): void {
    this.dnService.generatePdf(this.formId);
  }
}
