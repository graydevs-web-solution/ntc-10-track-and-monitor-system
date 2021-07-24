export interface ServiceCenterReportSummary {
  id?: string;
  dateInspected: Date | string;
  nameOfServiceCenter: string;
  notedby: string;
  isApproved: boolean;
  approver: string;
}
