import {ProjectData} from './ProjectResponse';
import { Response } from './Response';
export interface ClientResponse extends Response {
  data: ClientData | ClientData[];
}

export interface ClientData {
  client_id: number;
  business_name: string;
  email: string;
  initial_date: Date;
  address: string;
  projects?: ProjectData[];
}
