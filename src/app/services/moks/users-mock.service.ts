import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})

export class UsersMockService {

  constructor() { }

  private users: Object[] = [

    {
      id: 2,
      name: 'María José Pappalardo',
    },
    {
      id: 3,
      name: 'Ricardo Farias',
    },
    {
      id: 4,
      name: 'Lucas Sansberro',
    },
    {
      id: 5,
      name: 'Fernando Mesa',
    },
    {
      id: 6,
      name: 'Diego Agudo',
    },
    {
      id: 7,
      name: 'Laureano Marenco',
    },
    {
      id: 8,
      name: 'Matias Abossio',
    },
    {
      id: 9,
      name: 'Miguel Perez',
    },
    {
      id: 10,
      name: 'Francisco Cejas',
    },
    {
      id: 11,
      name: 'Marianela Fernandez',
    },
    {
      id: 12,
      name: 'Luis Gomez',
    }
  ];

  getUsers(): any[] {
    return this.users;
  }

  solicitudes = [
    {
      email: 'lcastro@asj.com',
      name: 'Lucia Castro',
    },
    {
      email: 'edias@asj.com',
      name: 'Esteban Dias',
    },
    {
      email: 'jortegoza@asj.com',
      name: 'Juan Ortegoza',
    },
    {
      email: 'eFlores@asj.com',
      name: 'Emanuel Flores',
    },
    {
      email: 'mCampos@asj.com',
      name: 'Micaela Campos',
    },
    {
      email: 'lcastro@asj.com',
      name: 'Lucia Castro',
    },
    {
      email: 'edias@asj.com',
      name: 'Esteban Dias',
    },
    {
      email: 'jortegoza@asj.com',
      name: 'Juan Ortegoza',
    },
    {
      email: 'eFlores@asj.com',
      name: 'Emanuel Flores',
    },
    {
      email: 'mCampos@asj.com',
      name: 'Micaela Campos',
    },
  ];

  getSolicitudes(): any[] {
    return this.solicitudes;
  }
}
