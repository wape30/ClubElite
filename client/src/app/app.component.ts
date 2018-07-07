import { Component } from '@angular/core';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent {
  public title = 'Club Elite!';
  public user: User;
  public identity;
  public token;

  constructor(){
    this.user = User('','','','','','','','ROLE_USER','','','','','');
  }

}
