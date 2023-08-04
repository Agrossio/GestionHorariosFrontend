import { Response } from './Response';

export interface PersonToBeAcceptedResponse extends Response {
  data: PersonToBeAcceptedData;
}

export interface PersonToBeAcceptedData {
  email: string;
  name: string;
  lastname: string;
}
