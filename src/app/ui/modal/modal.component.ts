import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ADD,
  DELETE,
  EDIT,
  mobilePhoneDealer,
  radioTransceiver,
  serviceCenterReport,
  stationDelete,
  stationEdit,
  stationView,
  VIEW,
} from 'src/app/shared/constants';
import { MobilePhoneDealerService } from './../../mobile-phone-dealer/mobile-phone-dealer.service';
import { ServiceCenterReportService } from './../../service-center/service-center-report.service';
import { RadioTransceiverService } from './../../radio-transceiver/radio-transceiver.service';
import { StationService } from './../../master-list/station/station.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  @Input() formMode: string;
  @Input() formId: string;
  @Input() componentName: string;

  stationEdit = stationEdit;

  constructor(
    public activeModal: NgbActiveModal,
    private mobilePhoneDealerService: MobilePhoneDealerService,
    private radioTransceiverService: RadioTransceiverService,
    private serviceCenterReportService: ServiceCenterReportService,
    private stationService: StationService
  ) {}

  ngOnInit(): void {}

  isRemoveEntry = (): boolean => {
    const allowedComponents = [mobilePhoneDealer, radioTransceiver, serviceCenterReport, stationDelete];
    return allowedComponents.includes(this.componentName) && this.formMode === DELETE;
  };

  isStationEdit(): boolean {
    return this.componentName === stationEdit && (this.formMode === EDIT || this.formMode === ADD);
  }

  isStationView(): boolean {
    return this.componentName === stationView && this.formMode === VIEW;
  }

  removeEntry(): void {
    switch (this.componentName) {
      case mobilePhoneDealer:
        this.mobilePhoneDealerService.deleteOne(this.formId);
        break;
      case radioTransceiver:
        this.radioTransceiverService.deleteOne(this.formId);
        break;
      case serviceCenterReport:
        this.serviceCenterReportService.deleteOne(this.formId);
        break;
      case stationDelete:
        this.stationService.deleteOne(this.formId);
        break;
      default:
        break;
    }
    this.activeModal.close();
  }

  saveStation() {
    this.stationService.saveStationListener.next();
  }
}
