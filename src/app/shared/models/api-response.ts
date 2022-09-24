import { AccomplishmentReportAPI } from 'src/app/accomplishment-report/models/accomplishment-report-api';
import { ComplaintAPI } from 'src/app/complaint/models/complaint-api.model';
import { DeficiencyNoticeAPI } from 'src/app/deficiency-notice/models/deficiency-notice-api.model';
import { ClientAPI } from 'src/app/master-list/clients/models/client-api.model';
import { MobilePhoneDealerAPI } from 'src/app/mobile-phone-dealer/models/mobile-phone-dealer-api.model';
import { RadioDealerAPI } from 'src/app/radio-dealer/models/radio-dealer-api.model';
import { RadioTransceiverAPI } from 'src/app/radio-transceiver/models/radio-transceiver-api.model';
import { ServiceCenterReportAPI } from 'src/app/service-center/models/service-center-report-api.model';

export interface APIResponse {
  data:
    | RadioTransceiverAPI[]
    | MobilePhoneDealerAPI[]
    | ServiceCenterReportAPI[]
    | RadioDealerAPI[]
    | DeficiencyNoticeAPI[]
    | ComplaintAPI[]
    | AccomplishmentReportAPI[]
    | ClientAPI[];
  collectionSize: number;
}
