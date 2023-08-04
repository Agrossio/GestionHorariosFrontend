import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsMockService {

  constructor() { }

  
private PROJECTS = [
  {
    id: 1,
    name: 'Proyecto 1',
    description: 'Descripción del proyecto 1',
  },
  {
    id: 2,
    name: 'Proyecto 2',
    description: 'Descripción del proyecto 2',
  },
  {
    id: 1,
    name: 'Proyecto 3',
    description: 'Descripción del proyecto 1',
  },
  {
    id: 1,
    name: 'Proyecto 4',
    description: 'Descripción del proyecto 1',
  },
  {
    id: 1,
    name: 'Proyecto 5',
    description: 'Descripción del proyecto 1',
  },
  {
    id: 1,
    name: 'Proyecto 6',
    description: 'Descripción del proyecto 1',
  },
  {
    id: 1,
    name: 'Proyecto 7',
    description: 'Descripción del proyecto 1',
  },
  {
    id: 1,
    name: 'Proyecto 8',
    description: 'Descripción del proyecto 1',
  },
  {
    id: 1,
    name: 'Proyecto 9',
    description: 'Descripción del proyecto 1',
  },
  {
    id: 1,
    name: 'Proyecto 7',
    description: 'Descripción del proyecto 1',
  },
  {
    id: 1,
    name: 'Proyecto 8',
    description: 'Descripción del proyecto 1',
  },
  {
    id: 1,
    name: 'Proyecto 9',
    description: 'Descripción del proyecto 1',
  }
];

getProjects(): any[] {
  return this.PROJECTS;
}
  

private projectsClientsUser = [
  {
    id: 1,
    name: 'Tarjeta de crédito',
    description: 'Grupo Gabriel | 57% completado',
  },
  {
    id: 2,
    name: 'Seguridad',
    description: 'Grupo Claudia | 37% completado',
  }
];

getProjectsClientUser(): any[] {
  return this.projectsClientsUser;
}  
  
  
}
