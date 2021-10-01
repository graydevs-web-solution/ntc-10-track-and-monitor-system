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
  docketNumber: string;
  violationInfo: ViolationInfo;
  clientName?: string;
  transmitters: TransmittersInfo[];
  dateOfDeficiencyHearing: Date | string;
  isDone: boolean;
  regionalDirector: string;
}
