import { DateTime } from 'luxon';

export const dateWithPadding = (data: string): string => {
  const [year, month, day] = data.split('-');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const formatDate = (date: string | Date, withPadding = true): Date | string | null => {
  if (!date) {
    return null;
  }
  if (withPadding) {
    return new Date(DateTime.fromISO(dateWithPadding(date as string)).toISO());
  }
  return DateTime.fromISO(date.toLocaleString()).toISO();
};

export const formatTime = (date: Date) => {
  if (!date) {
    return null;
  }
  const dateVal = DateTime.fromISO(date.toLocaleString());
  const hour = dateVal.hour;
  const minute = dateVal.minute;
  return { hour, minute };
};

export const isArrayValue = (arrayVal: Array<any>): Array<any> => {
  if (!arrayVal) {
    return [];
  }
  return arrayVal;
};

export const openPDF = (pdf: string, fileName: string) => {
  return (
    '<html><head>' +
    '<title>' +
    fileName +
    '</title>' +
    "<style>body { margin: 0px!important; }</style></head><iframe width='100%' height='100%' src='" +
    pdf +
    "' title='" +
    fileName +
    "' style='border:none;'></iframe></html>"
  );
};
