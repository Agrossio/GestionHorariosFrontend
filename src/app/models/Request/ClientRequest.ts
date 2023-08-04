export class ClientRequest {
  business_name: string;
  email: string;
  initial_date: Date;
  address: string;

  constructor(
    business_name: string,
    email: string,
    initial_date: Date,
    address: string
  ) {
    this.business_name = business_name;
    this.email = email;
    this.initial_date = initial_date;
    this.address = address;
  }
}
