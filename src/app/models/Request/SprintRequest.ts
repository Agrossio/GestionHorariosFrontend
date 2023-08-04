export class SprintRequest {
  start_date: Date;
  end_date: Date;

  constructor(start_date: Date, end_date: Date) {
    this.start_date = start_date;
    this.end_date = end_date;
  }
}
