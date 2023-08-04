import { PersonResponse } from './PersonResponse';
import { Response } from './Response';
import { SprintResponse } from './SprintResponse';

export interface ProjectResponse extends Response {
  data: ProjectData | ProjectData[];
}

export interface ProjectData {
  project_id: number;
  hour_price: number;
  name: string;
  stack: string;
  description: string;
  hours_estimate: number;
  end_estimate_date: Date;
  client_id: number;
  business_name: string | null;
  people?: PersonResponse[];
  sprints?: SprintResponse[];
}