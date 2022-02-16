import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { AccomplishmentReportService } from '../../accomplishment-report.service';

@Component({
  selector: 'app-accomplishment-report-edit',
  templateUrl: './accomplishment-report-edit.component.html',
  styleUrls: ['./accomplishment-report-edit.component.css'],
})
export class AccomplishmentReportEditComponent implements OnInit {
  months: { value: string; description: string }[] = [
    { value: '1', description: 'January' },
    { value: '2', description: 'February' },
    { value: '3', description: 'March' },
    { value: '4', description: 'April' },
    { value: '5', description: 'May' },
    { value: '6', description: 'June' },
    { value: '7', description: 'July' },
    { value: '8', description: 'August' },
    { value: '9', description: 'September' },
    { value: '10', description: 'October' },
    { value: '11', description: 'November' },
    { value: '12', description: 'December' },
  ];
  years: number[] = [];
  form: FormGroup;

  saveARSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private accomplishmentReportService: AccomplishmentReportService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initYears();
    this.initForm();

    this.saveARSubs = this.accomplishmentReportService.saveAccomplishmentReportListener.subscribe({
      next: () => {
        //
        this.submit();
      },
    });
  }

  initForm() {
    this.form = this.fb.group({
      month: [],
      year: [],
      description: [],
    });
  }

  async submit() {
    try {
      await this.accomplishmentReportService.addOne(this.form.value).toPromise();
      this.accomplishmentReportService.getEntriesAPI();
      this.activeModal.close();
    } catch (error) {
      console.log(error);
    }
  }

  initYears(): void {
    const yearStart = 2022;
    const yearsDifference = DateTime.now().toJSDate().getFullYear() - yearStart;
    const yearEnd = yearStart + yearsDifference;
    const years = [];
    for (let index = yearStart; index <= yearEnd; index++) {
      years.push(index);
    }
    this.years = years;
  }
}
