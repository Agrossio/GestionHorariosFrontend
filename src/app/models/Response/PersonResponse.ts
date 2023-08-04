import {Role} from '../Role';
import {Response} from './Response';
import {ProjectData} from "./ProjectResponse";


export interface PersonResponse extends Response {
  data: PersonData | PersonData[];
}

export interface PersonData {
  name: string;
  lastname: string;
  cuil: string;
  tel: string;
  email: string;
  start_job_relation: Date;
  hours_journal: number;
  image: string;
  roles: Role[];
  projects: ProjectData[];
  token: string;
}
