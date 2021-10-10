import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ADD,
  clientDelete,
  clientEdit,
  clientSearch,
  clientView,
  dealerDelete,
  dealerEdit,
  dealerView,
  deficiencyNotice,
  DELETE,
  EDIT,
  mobilePhoneDealer,
  radioDealer,
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
import { ClientService } from './../../master-list/clients/client.service';
import { StationService } from './../../master-list/station/station.service';
import { ServiceCenterService } from 'src/app/master-list/service-center/service-center.service';
import { DealerService } from 'src/app/master-list/dealer/dealer.service';
import { RadioDealerService } from 'src/app/radio-dealer/radio-dealer.service';
import { DeficiencyNoticeService } from 'src/app/deficiency-notice/deficiency-notice.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
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
    private clientService: ClientService,
    private radioDealerService: RadioDealerService,
    private dnService: DeficiencyNoticeService // private stationService: StationService, // private serviceCenterService: ServiceCenterService, // private dealerService: DealerService,
  ) {}

  ngOnInit(): void {}

  isRemoveEntry = (): boolean => {
    const allowedComponents = [
      mobilePhoneDealer,
      radioTransceiver,
      serviceCenterReport,
      radioDealer,
      deficiencyNotice,
      clientDelete,
      // stationDelete,
      // serviceCenterDelete,
      // dealerDelete,
    ];
    return allowedComponents.includes(this.componentName) && this.formMode === DELETE;
  };

  // isStationEdit(): boolean {
  //   return this.componentName === stationEdit && (this.formMode === EDIT || this.formMode === ADD);
  // }

  // isStationView(): boolean {
  //   return this.componentName === stationView && this.formMode === VIEW;
  // }

  // isServiceCenterEdit(): boolean {
  //   return this.componentName === serviceCenterEdit && (this.formMode === EDIT || this.formMode === ADD);
  // }

  // isServiceCenterView(): boolean {
  //   return this.componentName === serviceCenterView && this.formMode === VIEW;
  // }

  // isDealerEdit(): boolean {
  //   return this.componentName === dealerEdit && (this.formMode === EDIT || this.formMode === ADD);
  // }

  // isDealerView(): boolean {
  //   return this.componentName === dealerView && this.formMode === VIEW;
  // }

  isClientEdit(): boolean {
    return this.componentName === clientEdit && (this.formMode === EDIT || this.formMode === ADD);
  }

  isClientSearch(): boolean {
    return this.componentName === clientSearch;
  }

  isClientView(): boolean {
    return this.componentName === clientView && this.formMode === VIEW;
  }

  async removeEntry(): Promise<void> {
    try {
      switch (this.componentName) {
        case radioDealer:
          await this.radioDealerService.deleteOne(this.formId).toPromise();
          this.radioDealerService.getEntriesAPI();
          break;
        case mobilePhoneDealer:
          await this.mobilePhoneDealerService.deleteOne(this.formId).toPromise();
          this.mobilePhoneDealerService.getEntriesAPI();
          break;
        case radioTransceiver:
          await this.radioTransceiverService.deleteOne(this.formId).toPromise();
          this.radioTransceiverService.getEntriesAPI();
          break;
        case serviceCenterReport:
          await this.serviceCenterReportService.deleteOne(this.formId).toPromise();
          this.serviceCenterReportService.getEntriesAPI();
          break;
        case deficiencyNotice:
          await this.dnService.deleteOne(this.formId).toPromise();
          this.dnService.getEntriesAPI();
          break;
        // case stationDelete:
        //   this.stationService.deleteOne(this.formId);
        //   break;
        // case serviceCenterDelete:
        //   this.serviceCenterService.deleteOne(this.formId);
        //   break;
        // case dealerDelete:
        //   this.dealerService.deleteOne(this.formId);
        //   break;
        default:
          break;
      }
    } catch (error) {
    } finally {
      this.activeModal.close();
    }
  }

  // saveStation() {
  //   this.stationService.saveStationListener.next();
  // }

  // saveServiceCenter() {
  //   this.serviceCenterService.saveServiceCenterListener.next();
  // }

  // saveDealer() {
  //   this.dealerService.saveDealerListener.next();
  // }

  saveClient() {
    this.clientService.saveClientListener.next();
  }
}
