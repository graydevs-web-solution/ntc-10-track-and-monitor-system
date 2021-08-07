import { ClientAPI } from 'src/app/master-list/clients/models/client-api.model';
import { Client } from 'src/app/master-list/clients/models/client.model';

interface Operator {
  ['id']?: number;
  ['name']: string;
  ['particular_of_license']: string;
  ['expiration_date']: Date | string;
}

interface RadioTransceiverItem {
  ['id']?: number;
  ['model']: string;
  ['serial_number']: string;
  ['freq_range']: string;
  ['power_output']: string;
  ['freq_control']: string;
}

export interface RadioTransceiverAPI {
  id?: number;
  ['date_issued']: Date | string;
  ['client_id']: number | Client;
  ['clients']: ClientAPI;
  ['class_type']: string;
  ['nature_of_service']: string;
  ['working_hours']: string;
  ['form_type']: string;
  ['call_sign']: string;
  ['motor_number']: string;
  ['plate_number']: string;
  ['gross_tonnage']: string;
  ['pp_number']: string;
  ['pp_date_issued']: Date;
  ['tp_number']: string;
  ['tp_expiration_date']: Date | string;
  ['cp_number']: string;
  ['cp_expiration_date']: Date | string;
  ['license_number']: string;
  ['license_expiration_date']: Date | string;
  ['points_of_communication']: string;
  ['radio_transceiver_operators']: Operator[];
  ['radio_transceiver_items']: RadioTransceiverItem[];
  ['freq_assigned_freq']: string;
  ['freq_crystal_freq']: string;
  ['freq_measured_freq']: string;
  ['freq_if_receiver']: string;
  ['freq_type_of_emission']: string;
  ['freq_antenna_system_type']: string;
  ['freq_elevation_from_gmd']: string;
  ['freq_gain']: string;
  ['freq_directivity']: string;
  ['freq_power_supply']: string;
  ['freq_battery']: string;
  ['freq_voltage_and_type']: string;
  ['freq_capacity']: string;
  ['freq_ah']: string;
  ['illegal_construction_without_permit']: boolean;
  ['illegal_transfer']: boolean;
  ['operation_without_rsl']: boolean;
  ['operation_without_lro']: boolean;
  ['operation_without_logbook']: boolean;
  ['operation_on_lower_sideband']: boolean;
  ['operation_on_unauthorized_hours']: boolean;
  ['operation_operating_unauthorized_freq']: boolean;
  ['off_frequency']: boolean;
  ['still_in_the_old_frequency_grouping']: boolean;
  ['illegal_possession']: boolean;
  ['others']: string;
  ['sundray_info_radio_operator_logbook']: string;
  ['sundray_info_station_product_unwanted_signal']: string;
  ['sundray_info_radio_equipment_operative']: string;
  ['recommendations']: string;
  ['radio_requlation_inspector']: string;
  ['authorized_representative']: string;
  ['regional_director']: string;
}
