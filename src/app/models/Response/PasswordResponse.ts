import {Response} from "./Response";

export interface PasswordResponse extends Response {
  data: PassData | PassData[];
}

export interface PassData {
  oldPassword: string;
  newPassword: string;
}
