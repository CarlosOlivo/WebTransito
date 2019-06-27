import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class AppComponent {
  title = 'Transito';
  private API_BASE = 'http://localhost:8080/api';
  API_REPORTE = `${this.API_BASE}/reporte`;
  API_CONDUCTOR = `${this.API_BASE}/conductor`;
  API_VEHICULO = `${this.API_BASE}/vehiculo`;
  API_ASEGURADORA = `${this.API_BASE}/aseguradora`;
  API_IMPLICADO = `${this.API_BASE}/implicado`;
  API_DICTAMEN = `${this.API_BASE}/dictamen`;
  API_PERSONAL = `${this.API_BASE}/personal`;
  API_CARGO = `${this.API_BASE}/cargo`;
}
