import { Injectable } from '@angular/core';
import { ClientData } from 'src/app/models/Response/ClientResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientsMockService {

  constructor() { }

  private clients: ClientData[] = [
    // {
    //   client_id: 1,
    //   business_name: 'Fiat',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(2005, 1),
    //   address: 'Pepito',
    //   projects: [],
    // }
    // {
    //   client_id: 2,
    //   business_name: 'Toyota',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(1995, 1),
    //   adress: 'Pepito',
    //   projects: [],
    // },
    // {
    //   client_id: 3,
    //   business_name: 'Santander',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(2000, 1),
    //   adress: 'Pepito',
    //   projects: [],
    // },
    // {
    //   client_id: 4,
    //   business_name: 'BBVA',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(2000, 1),
    //   adress: 'Pepito',
    //   projects: [],
    // },
    // {
    //   client_id: 5,
    //   business_name: 'Disco',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(2000, 1),
    //   adress: 'Pepito',
    //   projects: [],
    // },
    // {
    //   client_id: 6,
    //   business_name: 'Coto',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(2000, 1),
    //   adress: 'Pepito',
    //   projects: [],
    // },
    // {
    //   client_id: 7,
    //   business_name: 'Mercado libre',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(2000, 1),
    //   adress: 'Pepito',
    //   projects: [],
    // },
    // {
    //   client_id: 8,
    //   business_name: 'Banco San Juan',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(2000, 1),
    //   adress: 'Pepito',
    //   projects: [],
    // },
    // {
    //   client_id: 9,
    //   business_name: 'Banco Santa Fe',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(2000, 1),
    //   adress: 'Pepito',
    //   projects: [],
    // },
    // {
    //   client_id: 10,
    //   business_name: 'Banco Entre Ríos',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(2000, 1),
    //   adress: 'Pepito',
    //   projects: [],
    // },
    // {
    //   client_id: 11,
    //   business_name: 'Banco Santa Cruz',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(2000, 1),
    //   adress: 'Pepito',
    //   projects: [],
    // },
    // {
    //   client_id: 12,
    //   business_name: 'Grupo Petersen',
    //   email: 'Descripción del cliente 1',
    //   initial_date: new Date(2000, 1),
    //   adress: 'Pepito',
    //   projects: [],
    // },
  ];

  getClients(): ClientData[] {
    return this.clients;
  }
}
