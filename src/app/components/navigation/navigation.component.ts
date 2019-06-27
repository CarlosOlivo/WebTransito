import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  title: string = '';
  personal: any = {
    nombre: 'Invitado'
  };

  constructor(private appComponent: AppComponent, private auth: AuthService) { }

  ngOnInit() {
    this.personal = this.auth.getPersonal();
    this.title = this.appComponent.title;
  }

  logout() {
    this.auth.delPersonal();
    window.location.pathname = '';
  }

}
