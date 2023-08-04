export class PersonRequest {
  name: string;
  lastname: string;
  email: string;
  cuil: string;
  tel: string;
  hours_journal: number;
  password: string;
  image?: string;

  constructor(
    email: string,
    password: string,
    name: string,
    lastname: string,
    tel: string,
    hours_journal: number,
    cuil: string,
    image?: string
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.cuil = cuil;
    this.password = password;
    this.tel = tel;
    this.hours_journal = hours_journal;
    this.image = image;
  }
}
