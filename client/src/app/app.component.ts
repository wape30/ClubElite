import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'Club Elite!';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMenssage;
  public alertRegister;

  constructor(
    private _userService:UserService
  ){
    this.user = new User('','','','','','','','ROLE_USER','','','','','');
    this.user_register = new User('','','','','','','','ROLE_USER','','','','','');
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log(this.identity);
    console.log(this.token);
  }

  public onSubmit(){
    console.log(this.user);

    this._userService.singUp(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;
        if(!this.identity._id){
          alert("El usuario no esta correctamente identificado");
        }else{
          // crear elemento en el lcoal storagepara mantener una sesion
          localStorage.setItem('identity', JSON.stringify(identity));
          // conseguir el tokken
                this._userService.singUp(this.user, 'true').subscribe(
                  response => {
                    let token = response.token;
                    this.token = token;
                    if(this.token.length <= 0){
                      alert("No se ha generado el token");
                    }else{
                      // crear elemento en el lcoal storagepara mantener un token disponible
                      localStorage.setItem('token', token);
                        this.user = new User('','','','','','','','ROLE_USER','','','','','');
                      // conseguir el tokken
                    }
                        },
                  error =>{
                    var errorMenssage = <any>error;
                    if(errorMenssage != null){
                      var body = JSON.parse(error._body);
                      this.errorMenssage = body.message;
                      console.log(error);
                    }

                  }
                );
        }
            },
      error =>{
        var errorMenssage = <any>error;
        if(errorMenssage != null){
          var body = JSON.parse(error._body);
          this.errorMenssage = body.message;
          console.log(error);
        }

      }
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }


  onSubmitRegister(){
    console.log(this.user_register);
    this._userService.register(this.user_register).subscribe(
      response=>{
        let user = response.user;
        this.user_register = user;
        if(!user._id){
            this.alertRegister('Error al registrarse');
        }else{
            this.alertRegister = 'El registro se a realizado correctamente';
            this.user_register = new User('','','','','','','','ROLE_USER','','','','','');
        }
      },
      error =>{
        var errorMenssage = <any>error;
        if(errorMenssage != null){
          var body = JSON.parse(error._body);
          this.alertRegister = body.message;
          console.log(error);
        }
      }
    );
  }
}
