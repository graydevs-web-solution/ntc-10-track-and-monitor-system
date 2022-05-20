import { Client } from 'src/app/master-list/clients/models/client.model';
import { UserAssignedData } from 'src/app/system-setting/model/user-assigned-data';
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

export interface TimeInfo {
  hour: number;
  minute: number;
}

export interface Complaint {
  id?: number;
  date: Date | string;
  complainantName: string;
  clientId: number | Client;
  clientName?: string;
  respondentName: string;
  docketNumberDescription: string;
  docketNumberStart: number;
  docketNumberEnd: number;
  dateOfInspection: Date | string;
  location: string;
  reason: string;
  transmitters: TransmittersInfo[];
  violationInfo: ViolationInfo;
  dateOfHearing: Date | string;
  timeOfHearing: TimeInfo;
  regionalDirector: string;
  regionalDirectorInfo?: UserAssignedData;
  regionalDirectorApproved: boolean;
  isDone: boolean;
}
