export class DeveloperRequest {
  tel: string;
  cbu: string;
  start_job_relation: Date;
  constructor(tel: string, cbu: string, start_job_relation: Date) {
    this.tel = tel;
    this.cbu = cbu;
    this.start_job_relation = start_job_relation;
  }
}
