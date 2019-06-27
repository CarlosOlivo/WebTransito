import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private appComponent: AppComponent, private httpClient: HttpClient) { }

  getReportes() {
    return this.httpClient.get(`${this.appComponent.API_REPORTE}`);
  }

  getReporte(idReporte: string) {
    return this.httpClient.get(`${this.appComponent.API_REPORTE}/${idReporte}`);
  }

  getConductor(idConductor: string) {
    return this.httpClient.get(`${this.appComponent.API_CONDUCTOR}/${idConductor}`);
  }

  getVehiculo(placas: string) {
    return this.httpClient.get(`${this.appComponent.API_VEHICULO}/${placas}`);
  }

  getAseguradora(idAseguradora: string) {
    return this.httpClient.get(`${this.appComponent.API_ASEGURADORA}/${idAseguradora}`);
  }

  getImplicado(idImplicado: string) {
    return this.httpClient.get(`${this.appComponent.API_IMPLICADO}/${idImplicado}`);
  }

  getDictamen(idDictamen: string) {
    return this.httpClient.get(`${this.appComponent.API_DICTAMEN}/${idDictamen}`);
  }

  newDictamen(descripcion: any) {
    return this.httpClient.post(`${this.appComponent.API_DICTAMEN}`, descripcion);
  }

  putReporte(idReporte: string, reporte: any) {
    return this.httpClient.put(`${this.appComponent.API_REPORTE}/${idReporte}`, reporte);
  }

  getPersonal(idPersonal: string) {
    return this.httpClient.get(`${this.appComponent.API_PERSONAL}/${idPersonal}`);
  }

  getCargo(idCargo: string) {
    return this.httpClient.get(`${this.appComponent.API_CARGO}/${idCargo}`)
  }
}
