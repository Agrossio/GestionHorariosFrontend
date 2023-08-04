export class Status {
    status_id: number;
    status_name: string;
  
    constructor(statusId: number, statusName: string) {
      this.status_id = statusId;
      this.status_name = statusName;
    }
  }

export const status1 = new Status(1, 'PENDING');
export const status2 = new Status(2, 'IN_PROGRESS');
export const status3 = new Status(3, 'DONE');
export const status4 = new Status(4, 'CANCELLED');
export const status5 = new Status(5, 'REVIEWING');