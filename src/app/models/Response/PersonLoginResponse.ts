import { Role } from '../Role';
import { Response } from './Response';


export interface PersonLoginResponse extends Response{
  data: PersonLoginData;
}

export interface PersonLoginData {
  token: string;
  email: string;
  roles: [Role];
}
