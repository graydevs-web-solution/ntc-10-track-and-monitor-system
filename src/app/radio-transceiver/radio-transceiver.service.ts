import { Client } from 'src/app/master-list/clients/models/client.model';
import { Injectable } from '@angular/core';
import { RadioTransceiver } from './models/radio-transceiver.model';
import { DateTime } from 'luxon';
import { dateWithPadding, formatDate, openPDF, formatName } from '../shared/utility';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageOptions } from '../shared/models/page-options';
import { environment } from 'src/environments/environment';
import { RadioTransceiverAPI } from './models/radio-transceiver-api.model';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { LIST } from '../shared/constants';
import { ClientAPI } from '../master-list/clients/models/client-api.model';
@Injectable({
  providedIn: 'root',
})
export class RadioTransceiverService {
  page: PageOptions = {
    current: 1,
    size: 10,
    search: '',
  };
  resourceType = new ReplaySubject<string>();

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
          const pdfWindow = window.open();
          pdfWindow.document.write(openPDF(response, 'Radio Transceiver'));
          pdfWindow.document.close();
          // saveAs(response, 'sss.pdf');
          // const blob = this.base64toBlob(response);
          // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          //   window.navigator.msSaveOrOpenBlob(blob, 'pdfBase64.pdf');
          // } else {
          // const blobUrl = URL.createObjectURL(blob);
          // window.open(blobUrl);
          // }
        },
        error: (err) => {
          console.log('err', err);
        },
      });
  }

  base64toBlob = (base64Data: string) => {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: 'application/pdf' });
  };

  formatData = (data: RadioTransceiver): RadioTransceiver => {
    const formattedData: RadioTransceiver = {
      ...data,
      dateIssued: formatDate(data.dateIssued as string),
      ppInfo: {
        ...data.ppInfo,
        dateIssued: formatDate(data.ppInfo?.dateIssued as string),
      },
      cpInfo: {
        ...data.cpInfo,
        expirationDate: formatDate(data.cpInfo?.expirationDate as string),
      },
      tpInfo: {
        ...data.tpInfo,
        expirationDate: formatDate(data.tpInfo?.expirationDate as string),
      },
      licInfo: {
        ...data.licInfo,
        expirationDate: formatDate(data.licInfo?.expirationDate as string),
      },
      operators: data.operators.map((val) => ({
        ...val,
        expirationDate: formatDate(val.expirationDate as string),
      })),
    };
    return formattedData;
  };

  formatList = (data: RadioTransceiverAPI): RadioTransceiver => {
    const value: RadioTransceiver = {
      id: data.id,
      dateIssued: formatDate(data.date_issued as Date, false),
      clientId: +data.client_id,
      clientName: (data.clients as ClientAPI).business_name,
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
        dateIssued: formatDate(data.pp_date_issued as Date, false),
      },
      tpInfo: {
        tpNumber: data.tp_number,
        expirationDate: formatDate(data.tp_expiration_date as Date, false),
      },
      cpInfo: {
        cpNumber: data.cp_number,
        expirationDate: formatDate(data.cp_expiration_date as Date, false),
      },
      licInfo: {
        licNumber: data.license_number,
        expirationDate: formatDate(data.license_expiration_date as Date, false),
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
            expirationDate: formatDate(val.expiration_date as Date, false),
          }))
        : null,
      receivers: data.radio_transceiver_receivers
        ? data.radio_transceiver_receivers.map((val) => ({
            id: val.id,
            name: val.name,
            serialNumber: val.serial_number,
            freqRange: val.freq_range,
            powerOutput: val.power_output,
            freqControl: val.freq_control,
          }))
        : null,
      otherEquipments: data.radio_transceiver_others
        ? data.radio_transceiver_others.map((val) => ({
            id: val.id,
            name: val.name,
            serialNumber: val.serial_number,
            freqRange: val.freq_range,
            powerOutput: val.power_output,
            freqControl: val.freq_control,
          }))
        : null,
      frequenciesInfo: {
        assignedFreq: data.freq_assigned_freq,
        crystalFreq: data.freq_crystal_freq,
        measuredFreq: data.freq_measured_freq,
        ifReceiver: data.freq_if_receiver,
        typeOfEmission: data.freq_type_of_emission,
      },
      antennaSystemInfo: {
        type: data.as_type,
        elevationFromGmd: data.as_elevation_from_gmd,
        lengthOfRadiator: data.as_length_of_radiator,
        gain: data.as_gain,
        directivity: data.as_directivity,
        powerSupply: data.as_power_supply,
        battery: data.as_battery,
        voltageAndType: data.as_voltage_and_type,
        capacity: data.as_capacity,
        ah: data.as_ah,
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
      regionalDirectorInfo: data.regional_director_info,
      notedByInfo: data.noted_by_info,
    };
    return value;
  };
}
