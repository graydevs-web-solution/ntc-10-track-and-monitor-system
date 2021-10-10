import { Client } from 'src/app/master-list/clients/models/client.model';
interface TransmittersInfo {
  transmitter: string;
  serialNumber: string;
}

interface ViolationInfo {
  operationWithoutRSL: boolean;
  operationWithoutLRO: boolean;
  operationUnauthorizedFrequency: boolean;
  possessionTransmitterWithoutPP: boolean;
  noNTCPertinentPapers: boolean;
}

export interface DeficiencyNotice {
  id?: number;
  date: Date | string;
  clientId: number | Client;
  respondentName: string;
  docketNumber: string;
  violationInfo: ViolationInfo;
  clientName?: string;
  transmitters: TransmittersInfo[];
  dateOfInspection: Date | string;
  dateOfDeficiencyHearing: Date | string;
  isDone: boolean;
  regionalDirector: string;
}
