import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { mobilePhoneDealer, radioTransceiver } from 'src/app/shared/constants';
import { MobilePhoneDealerService } from './../../mobile-phone-dealer/mobile-phone-dealer.service';
import { serviceCenterReport } from './../../shared/constants';
import { ServiceCenterReportService } from './../../service-center/service-center-report.service';
import { RadioTransceiverService } from './../../radio-transceiver/radio-transceiver.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  @Input() formStatus: string;
  @Input() formId: string;
  @Input() componentName: string;
  constructor(
    public activeModal: NgbActiveModal,
    private mobilePhoneDealerService: MobilePhoneDealerService,
    private radioTransceiverService: RadioTransceiverService,
    private serviceCenterReportService: ServiceCenterReportService
  ) {}

  ngOnInit(): void {}

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
      default:
        break;
    }
    this.activeModal.close();
  }
}
