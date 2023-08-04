import { Response } from './Response';
// import { Status } from '../Status';

export interface TaskResponse extends Response {
  data: TaskData | TaskData[];
}
export interface TaskData {
  task_id: number;
  title: string;
  description: string;
  story_points: number;
  start_date: Date;
  end_date: Date;
  hours_estimate: number;
  worked_hours: number;
  priority_name: string;
  status_name: string;
  dev_email?:string
  sprint_number?:number
}
