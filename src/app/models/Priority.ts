export class Priority {
  priority_id: number;
  priority_name: string;

  constructor(priority_id: number, priority_name: string) {
    this.priority_id = priority_id;
    this.priority_name = priority_name;
  }
}

//TODO Instanciar tipos de prioridad ¿Reemplazar con Enum?

export const priority1 = new Priority(1, 'HIGH');
export const priority2 = new Priority(2, 'MEDIUM');
export const priority3 = new Priority(3, 'LOW');
