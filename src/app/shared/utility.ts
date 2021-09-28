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

export const isArrayValue = (arrayVal: Array<any>): Array<any> => {
  if (!arrayVal) {
    return [];
  }
  return arrayVal;
};
