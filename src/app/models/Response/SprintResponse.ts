import { ProjectResponse } from './ProjectResponse';
import { Response } from './Response';

export interface SprintResponse extends Response {
  data: SprintData | SprintData[];
}

export interface SprintData {
  sprint_id: number;
  sprint_number: number;
  start_date: Date;
  end_date: Date;
  project: ProjectResponse;
}
