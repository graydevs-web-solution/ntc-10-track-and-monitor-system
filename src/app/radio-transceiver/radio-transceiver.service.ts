import { Injectable } from '@angular/core';
import { RadioTransceiver } from './models/radio-transceiver.model';
import { DateTime } from 'luxon';
import { dateWithPadding } from '../shared/utility';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageOptions } from '../shared/models/page-options';
import { environment } from 'src/environments/environment';
import { RadioTransceiverAPI } from './models/radio-transceiver-api.model';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root',
})
export class RadioTransceiverService {
  page: PageOptions = {
    current: 1,
    size: 10,
    search: '',
  };

  private entries: RadioTransceiver[] = [];
  private entriesListener = new Subject<RadioTransceiver[]>();

  private domainURL = environment.apiUrl;
  private resource1 = 'api/main/radio-transceiver';

  constructor(private http: HttpClient) {}

  getEntries(): RadioTransceiver[] {
    return this.entries;
  }

  getEntriesAPI(): void {
    const PARAMS = new HttpParams({
      fromObject: {
        page: `${this.page.current}`,
        size: `${this.page.size}`,
      },
    });
    this.http
      .get<{ data: RadioTransceiverAPI[] }>(`${this.domainURL}/${this.resource1}`, {
        params: PARAMS,
      })
      .pipe(map(({ data }) => ({ data: data.map(this.formatList) })))
      .subscribe({
        next: (response) => {
          this.entries = response.data;
          this.entriesListener.next(response.data);
        },
      });
  }

  getEntriesListener(): Observable<RadioTransceiver[]> {
    return this.entriesListener.asObservable();
  }

  getSelectedEntry(id: string): RadioTransceiver {
    return this.entries.find((entry) => entry.id === +id);
  }

  addOne(data: RadioTransceiver): Observable<{ data: RadioTransceiver }> {
    return this.http.post<{ data: RadioTransceiver }>(`${this.domainURL}/${this.resource1}/`, this.formatData(data));
  }

  updateOne(formId: string, data: RadioTransceiver): Observable<{ message: string }> {
    data.id = +formId;
    return this.http.patch<{ message: string }>(`${this.domainURL}/${this.resource1}/`, this.formatData(data));
  }

  deleteOne(formId: string): Observable<{ message: string }> {
    const PARAMS = new HttpParams({
      fromObject: {
        id: `${formId}`,
      },
    });
    return this.http.delete<{ message: string }>(`${this.domainURL}/${this.resource1}/`, {
      params: PARAMS,
    });
  }

  generatePdf(formId: string) {
    const PARAMS = new HttpParams({
      fromObject: {
        id: `${formId}`,
      },
    });
    this.http
      .get(`${this.domainURL}/${this.resource1}/pdf`, {
        responseType: 'text',
        params: PARAMS,
      })
      .subscribe({
        next: (response) => {
          saveAs(response, 'sss.pdf');
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }

  formatData = (data: RadioTransceiver): RadioTransceiver => {
    const formattedData: RadioTransceiver = {
      ...data,
      dateIssued: new Date(DateTime.fromISO(dateWithPadding(data.dateIssued as string)).toISO()),
      ppInfo: {
        ...data.ppInfo,
        dateIssued: data.ppInfo?.dateIssued ? new Date(DateTime.fromISO(dateWithPadding(data.ppInfo?.dateIssued as string)).toISO()) : null,
      },
      cpInfo: {
        ...data.cpInfo,
        expirationDate: data.cpInfo?.expirationDate
          ? new Date(DateTime.fromISO(dateWithPadding(data.cpInfo?.expirationDate as string)).toISO())
          : null,
      },
      licInfo: {
        ...data.licInfo,
        expirationDate: data.licInfo?.expirationDate
          ? new Date(DateTime.fromISO(dateWithPadding(data.licInfo?.expirationDate as string)).toISO())
          : null,
      },
      operators: data.operators.map((val) => ({
        ...val,
        expirationDate: val?.expirationDate ? new Date(DateTime.fromISO(dateWithPadding(val.expirationDate as string)).toISO()) : null,
      })),
    };
    return formattedData;
  };

  formatList = (data: RadioTransceiverAPI): RadioTransceiver => {
    const value: RadioTransceiver = {
      id: data.id,
      dateIssued: data.date_issued ? DateTime.fromISO(data.date_issued.toLocaleString()).toISO() : null,
      clientId: data.client_id,
      clientName: data.clients.name,
      classType: data.class_type,
      natureOfService: data.nature_of_service,
      workingHours: data.working_hours,
      formType: data.form_type,
      callSign: data.call_sign,
      motorNumber: data.motor_number,
      plateNumber: data.plate_number,
      grossTonnage: data.gross_tonnage,
      ppInfo: {
        ppNumber: data.pp_number,
        dateIssued: data.pp_date_issued ? DateTime.fromISO(data.pp_date_issued.toLocaleString()).toISO() : null,
      },
      tpInfo: {
        tpNumber: data.tp_number,
        expirationDate: data.tp_expiration_date ? DateTime.fromISO(data.tp_expiration_date.toLocaleString()).toISO() : null,
      },
      cpInfo: {
        cpNumber: data.cp_number,
        expirationDate: data.cp_expiration_date ? DateTime.fromISO(data.cp_expiration_date.toLocaleString()).toISO() : null,
      },
      licInfo: {
        licNumber: data.license_number,
        expirationDate: data.license_expiration_date ? data.license_expiration_date.toLocaleString() : null,
      },
      pointsOfCommunication: data.points_of_communication,
      radioTransceivers: data.radio_transceiver_items
        ? data.radio_transceiver_items.map((val) => ({
            id: val.id,
            model: val.model,
            serialNumber: val.serial_number,
            freqRange: val.freq_range,
            powerOutput: val.power_output,
            freqControl: val.freq_control,
          }))
        : null,
      operators: data.radio_transceiver_operators
        ? data.radio_transceiver_operators.map((val) => ({
            id: val.id,
            name: val.name,
            particularOfLicense: val.particular_of_license,
            expirationDate: val.expiration_date ? DateTime.fromISO(val.expiration_date.toLocaleString()).toISO() : null,
          }))
        : null,
      frequenciesInfo: {
        assignedFreq: data.freq_assigned_freq,
        crystalFreq: data.freq_crystal_freq,
        measuredFreq: data.freq_measured_freq,
        ifReceiver: data.freq_if_receiver,
        typeOfEmission: data.freq_type_of_emission,
        antennaSystemType: data.freq_antenna_system_type,
        elevationFromGmd: data.freq_elevation_from_gmd,
        lengthOfRadiator: data.freq_length_of_radiator,
        gain: data.freq_gain,
        directivity: data.freq_directivity,
        powerSupply: data.freq_power_supply,
        battery: data.freq_battery,
        voltageAndType: data.freq_voltage_and_type,
        capacity: data.freq_capacity,
        ah: data.freq_ah,
      },
      illegalConstructionInfo: {
        constructionsOfRadioStationsWithoutConstructionPermit: data.illegal_construction_without_permit,
        illegalTransfer: data.illegal_transfer,
      },
      illegalOperationInfo: {
        operationWithoutRadioStationLicensePermit: data.operation_without_rsl,
        operationWithoutLicenseRadioOperator: data.operation_without_lro,
        operationWithoutLogbook: data.operation_without_logbook,
        operationOnLowerSideband: data.operation_on_lower_sideband,
        operationOnUnauthorizedHours: data.operation_on_unauthorized_hours,
        operatingOnUnauthorizedFrequency: data.operation_operating_unauthorized_freq,
        offFrequency: data.off_frequency,
        stillInTheOldFrequencyGrouping: data.still_in_the_old_frequency_grouping,
      },
      illegalPossession: data.illegal_possession,
      others: data.others,
      sundrayInformationAboutRS: {
        isRadioOperatorEntryLogbooK: data.sundray_info_radio_operator_logbook,
        isStationProduceUnwantedSignals: data.sundray_info_station_product_unwanted_signal,
        isRadioEquipmentOperativeOnInspection: data.sundray_info_radio_equipment_operative,
      },
      authorizedRepresentative: data.authorized_representative,
      radioRegulationInspector: data.radio_requlation_inspector,
      recommendations: data.recommendations,
      notedBy: data.noted_by,
      regionalDirector: data.regional_director,
    };
    return value;
  };
}
