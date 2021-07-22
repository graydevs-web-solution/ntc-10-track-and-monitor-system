import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Injectable } from '@angular/core';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[2], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[0], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? `${date.year}${this.DELIMITER}${date.month}${this.DELIMITER}${date.day}` : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly DELIMITER = '/';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // eslint-disable-next-line @typescript-eslint/naming-convention

  parse(value: string): NgbDateStruct | null {
    if (value) {
      // let date = value.split(this.DELIMITER);
      const date = value.split(', ').join(' ').split(' ');
      let monthNumber = 0;
      for (let i = 0; i <= this.MONTH.length; i++) {
        if (date[0] === this.MONTH[i]) {
          monthNumber = i + 1;
        }
      }
      return {
        day: parseInt(date[1], 10),
        month: monthNumber,
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? this.MONTH[Number(date.month) - 1] + ' ' + date.day + ', ' + date.year : '';
  }
}
