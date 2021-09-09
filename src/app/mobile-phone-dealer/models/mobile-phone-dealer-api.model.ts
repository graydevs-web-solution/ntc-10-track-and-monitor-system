import { ClientAPI } from 'src/app/master-list/clients/models/client-api.model';
import { Client } from 'src/app/master-list/clients/models/client.model';

interface StocksOfSparesAndAccessories {
  ['particular']: string;
  ['number_of_units']: number;
}

interface MobilePhone {
  ['model']: string;
  ['imei_number']: string;
  ['source']: string;
}

interface SIM {
  ['sim_number']: string;
  ['mobile_phone_company']: string;
}

export interface MobilePhoneDealerAPI {
  id?: number;
  ['client_id']: number | Client;
  ['clients']: ClientAPI;
  ['date_inspected']: Date | string;
  ['spares_and_accessories']: StocksOfSparesAndAccessories[];
  ['mobile_phones']: MobilePhone[];
  ['sim']: SIM[];
  ['sundry_one']: string;
  ['sundry_two']: string;
  ['remarks_deficiencies_discrepancies_noted']: string;
  ['inspected_by']: string;
  ['owner_name']: string;
  ['owner_position']: string;
  ['recommendations']: string;
  ['noted_by']: string;
  ['regional_director']: string;
  ['is_approved']: boolean;
}