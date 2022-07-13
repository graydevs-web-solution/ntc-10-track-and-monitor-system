import { Complaint } from 'src/app/complaint/models/complaint.model';
import { DeficiencyNotice } from 'src/app/deficiency-notice/models/deficiency-notice.model';
import { ServiceCenter } from 'src/app/master-list/service-center/models/service-center.model';
import { MobilePhoneDealer } from 'src/app/mobile-phone-dealer/models/mobile-phone-dealer.model';
import { RadioDealer } from 'src/app/radio-dealer/models/radio-dealer.model';
import { RadioTransceiver } from 'src/app/radio-transceiver/models/radio-transceiver.model';

export interface Approval {
  userID: string;
  radioTransceiver?: RadioTransceiver;
  radioDealer?: RadioDealer;
  serviceCenter?: ServiceCenter;
  mobilePhoneDealer?: MobilePhoneDealer;
  complaint?: Complaint;
  deficiencyNotice?: DeficiencyNotice;
  approvalStatus: string;
  position: string;
}
