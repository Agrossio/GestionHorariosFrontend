export class MonthResponse {
  year: number;
  month: number;
  working_days: number;
  constructor(year: number, month: number, workingDays: number) {
    this.year = year;
    this.month = month;
    this.working_days = workingDays;
  }
}
