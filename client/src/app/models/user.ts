export class User{
    constructor(
      public _id: string,
      public nombre: string,
      public apellido: string,
      public apodo: string,
      public email: string,
      public telefono: string,
      public password: string,
      public rol: string,
      public img: string,
      public descripcion: string,
      public edad: string,
      public ciudad: string,
      public equipo: string
    ){}
}
