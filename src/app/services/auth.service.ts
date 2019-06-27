import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from "util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private appComponent: AppComponent, private httpClient: HttpClient) { }

  login(usuario: string, contrasenia: string) {
    return this.httpClient.post(`${this.appComponent.API_PERSONAL}/acceso`, {usuario: usuario, contrasenia: contrasenia});
  }

  registro(personal: any) {
    return this.httpClient.post(`${this.appComponent.API_PERSONAL}`, personal);
  }

  setPersonal(personal: any) {
    let personal_string = JSON.stringify(personal);
    localStorage.setItem("personal", personal_string);
  }

  getPersonal() {
    let personal_string = localStorage.getItem("personal");
    if (!isNullOrUndefined(personal_string)) {
      return JSON.parse(personal_string);
    } else {
      return null;
    }
  }

  delPersonal() {
    localStorage.removeItem("personal");
  }

  getCargos() {
    return this.httpClient.get(`${this.appComponent.API_CARGO}`);
  }
}
