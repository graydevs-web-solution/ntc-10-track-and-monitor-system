import { ClientAPI } from 'src/app/master-list/clients/models/client-api.model';
import { Client } from 'src/app/master-list/clients/models/client.model';
interface Transmitters {
  ['transmitter']: string;
  ['serial_number']: string;
}

interface ViolationInfo {
  ['operation_without_rsl']: boolean;
  ['operation_without_lro']: boolean;
  ['operation_unauhtorized_frequency']: boolean;
  ['possession_transmitter_without_pp']: boolean;
  ['no_ntc_pertinent_papers']: boolean;
}

export interface DeficiencyNoticeAPI {
  ['id']?: number;
  ['date']: Date | string;
  ['client_id']: number | Client;
  ['clients']: ClientAPI;
  ['respondent_name']: string;
  ['date_of_inspection']: Date | string;
  ['docket_number']: string;
  ['vi_operation_without_rsl']: boolean;
  ['vi_operation_without_lro']: boolean;
  ['vi_operation_unauthorized_frequency']: boolean;
  ['vi_possession_transmitter_without_pp']: boolean;
  ['vi_no_ntc_pertinent_papers']: boolean;
  ['deficiency_notice_transmitter']: Transmitters[];
  ['date_of_deficiency_hearing']: Date;
  ['is_done']: boolean;
  ['regional_director']: string;
}
