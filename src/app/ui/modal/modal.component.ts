import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ADD,
  dealerDelete,
  dealerEdit,
  dealerView,
  DELETE,
  EDIT,
  mobilePhoneDealer,
  radioTransceiver,
  serviceCenterDelete,
  serviceCenterEdit,
  serviceCenterReport,
  serviceCenterView,
  stationDelete,
  stationEdit,
  stationView,
  VIEW,
} from 'src/app/shared/constants';
import { MobilePhoneDealerService } from './../../mobile-phone-dealer/mobile-phone-dealer.service';
import { ServiceCenterReportService } from './../../service-center/service-center-report.service';
import { RadioTransceiverService } from './../../radio-transceiver/radio-transceiver.service';
import { StationService } from './../../master-list/station/station.service';
import { ServiceCenterService } from 'src/app/master-list/service-center/service-center.service';
import { DealerService } from 'src/app/master-list/dealer/dealer.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit, AfterViewInit {
  @Input() formMode: string;
  @Input() formId: string;
  @Input() componentName: string;

  stationEdit = stationEdit;

  constructor(
    public activeModal: NgbActiveModal,
    private mobilePhoneDealerService: MobilePhoneDealerService,
    private radioTransceiverService: RadioTransceiverService,
    private serviceCenterReportService: ServiceCenterReportService,
    private stationService: StationService,
    private serviceCenterService: ServiceCenterService,
    private dealerService: DealerService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.componentName);
    console.log(this.formMode);
  }

  isRemoveEntry = (): boolean => {
    const allowedComponents = [mobilePhoneDealer, radioTransceiver, serviceCenterReport, stationDelete, serviceCenterDelete, dealerDelete];
    return allowedComponents.includes(this.componentName) && this.formMode === DELETE;
  };

  isStationEdit(): boolean {
    return this.componentName === stationEdit && (this.formMode === EDIT || this.formMode === ADD);
  }

  isStationView(): boolean {
    return this.componentName === stationView && this.formMode === VIEW;
  }

  isServiceCenterEdit(): boolean {
    return this.componentName === serviceCenterEdit && (this.formMode === EDIT || this.formMode === ADD);
  }

  isServiceCenterView(): boolean {
    return this.componentName === serviceCenterView && this.formMode === VIEW;
  }

  isDealerEdit(): boolean {
    return this.componentName === dealerEdit && (this.formMode === EDIT || this.formMode === ADD);
  }

  isDealerView(): boolean {
    return this.componentName === dealerView && this.formMode === VIEW;
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
      case serviceCenterDelete:
        this.serviceCenterService.deleteOne(this.formId);
        break;
      case dealerDelete:
        this.dealerService.deleteOne(this.formId);
        break;
      default:
        break;
    }
    this.activeModal.close();
  }

  saveStation() {
    this.stationService.saveStationListener.next();
  }

  saveServiceCenter() {
    this.serviceCenterService.saveServiceCenterListener.next();
  }

  saveDealer() {
    this.dealerService.saveDealerListener.next();
  }
}
