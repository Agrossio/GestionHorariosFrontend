import { ClientResponse } from '../Response/ClientResponse';
import { PersonData, PersonResponse } from '../Response/PersonResponse';

export class ProjectRequest {
  name: string;
  description: string;
  stack: string;
  hours_estimate: number;
  hour_price: number;
  end_estimate_date: Date;
  client_id: number;
  people?: PersonData[]; //definir si podemos pasar nombre o mail
  constructor(
    name: string,
    description: string,
    stack: string,
    hours_estimate: number,
    hour_price: number,
    end_estimate_date: Date,
    client_id: number,
    people?: PersonData[]
  ) {
    this.hour_price = hour_price;
    this.name = name;
    this.stack = stack;
    this.description = description;
    this.hours_estimate = hours_estimate;
    this.end_estimate_date = end_estimate_date;
    this.client_id = client_id;
    this.people = people;
  }
}

//TODO Made certain attributes optional, to ease constructors in mock data (Client service)
