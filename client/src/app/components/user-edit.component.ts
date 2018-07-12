import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService]
})

export class UserEditComponent implements OnInit{
    public titulo: string;
    public user:User;
    public identity;
    public token;
    public alertMessage;

    constructor(
      private _userService:UserService
    ){
        this.titulo = 'Actualizar mis daticos';
        //localstorage sesiones de usuario
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;

    }

  ngOnInit(){
    console.log('user-edit.component.ts cargado');
  }

  onSubmit(){
    console.log(this.user);

    this._userService.updateUser(this.user).subscribe(
      response => {
        console.log('este es un lod de prueba');
          if(!response.user){
            this.alertMessage = 'El usuario no ha sido actualizado';
          }else{
            this.user = response.user;
            localStorage.setItem('identity', JSON.stringify(this.user));

            this.alertMessage = 'El usuario se ha actualizado correctamente';
          }
      },
      error =>{
        var errorMenssage = <any>error;
        if(errorMenssage != null){
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;
          console.log(error);
        }

      }
    );
  }

}
