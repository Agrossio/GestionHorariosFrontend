export class MonthRequest {
  year: number;
  month: number;
  working_days: number;
  constructor(year: number, month: number, workingDays: number) {
    this.year = year;
    this.month = month;
    this.working_days = workingDays;
  }
}
export interface YearMonthDays {
  year: number;
  monthWorkdays: MonthWorkdays[];
}
export interface MonthWorkdays {
  month: number;
  days: number[];
}
export interface YearMonth {
  year: number;
  month: number;
}
