export class RegisterRequest {
    name: string;
    lastname: string;
    email: string;
    cuil: string;
    tel: string;
    password: string;
    image?: string;
  
    constructor(
      email: string,
      password: string,
      name: string,
      lastname: string,
      tel: string,
      cuil: string,
      image?: string
    ) {
      this.name = name;
      this.lastname = lastname;
      this.email = email;
      this.cuil = cuil;
      this.password = password;
      this.tel = tel;
      this.image = image;
    }
  }
  