import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { StationService } from '../../station.service';

@Component({
  selector: 'app-station-view',
  templateUrl: './station-view.component.html',
  styleUrls: ['./station-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationViewComponent implements OnInit, OnDestroy {
  form: FormGroup;

  viewStationSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private stationService: StationService,
    private activeModal: NgbActiveModal,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.viewStationSubs = this.stationService.selectedEntry.subscribe({
      next: (value) => {
        this.form.patchValue(value);
        this.cd.detectChanges();
      },
    });
    this.initForm();
  }

  ngOnDestroy(): void {
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
    this.stationService.addOne(this.form.value);
    this.activeModal.close();
  }
}
