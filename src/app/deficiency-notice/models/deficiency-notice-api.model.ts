import { ClientAPI } from 'src/app/master-list/clients/models/client-api.model';
import { Client } from 'src/app/master-list/clients/models/client.model';
import { Setting } from 'src/app/system-setting/model/setting';
import { UserAssignedData } from 'src/app/system-setting/model/user-assigned-data';
import { DeficiencyNotice } from './deficiency-notice.model';
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
  ['docket_number_description']: string;
  ['docket_number_start']: number;
  ['docket_number_end']: number;
  ['vi_operation_without_rsl']: boolean;
  ['vi_operation_without_lro']: boolean;
  ['vi_operation_unauthorized_frequency']: boolean;
  ['vi_possession_transmitter_without_pp']: boolean;
  ['vi_no_ntc_pertinent_papers']: boolean;
  ['deficiency_notice_transmitter']: Transmitters[];
  ['date_of_deficiency_hearing']: Date;
  ['is_done']: boolean;
  ['regional_director']: string;
  ['regional_director_approved']: boolean;
  ['regional_director_info']: UserAssignedData;
}

export interface ResponseAddDeficiencyNotice {
  deficiencyNotice: DeficiencyNotice;
  setting: Setting;
}
