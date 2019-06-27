import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReportesService } from '../../services/reportes.service';
import { Gallery, GalleryRef, ImageItem } from '@ngx-gallery/core';
import $  from 'jquery';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  imgs: GalleryRef;
  descripcion: string = '';
  numbers: any;

  constructor(private activatedRoute: ActivatedRoute, private auth: AuthService, private reportesService: ReportesService, private snackBar: MatSnackBar, private gallery: Gallery) { }

  reporte: any = {
    idReporte: 'Cargando',
    placas: 'Cargando',
    fechaHora: 'Cargando',
    latitud: 'Cargando',
    longitud: 'Cargando',
    imgs: 0
  }

  conductor: any = {
    nombre: 'Cargando',
    fechaNacimiento: 'Cargando',
    numLicencia: 'Cargando',
    numCelular: 'Cargando'
  }

  vehiculo: any = {
    marca: 'Cargando',
    modelo: 'Cargando',
    anio: 'Cargando',
    color: 'Cargando',
    poliza: 'Cargando',
    idAseguradora: 'Cargando'
  }

  aseguradora: any = {
    aseguradora: 'Cargando'
  }

  implicado: any = {
    nombre: 'Cargando',
    placas: 'Cargando',
    poliza: 'Cargando',
    marca: 'Cargando',
    modelo: 'Cargando',
    color: 'Cargando',
    idAseguradora: 'Cargando'
  }

  aseguradoraImplicado: any = {
    aseguradora: 'Cargando'
  }

  dictamen: any = {
    fechaHora: 'Cargando',
    descripción: 'Cargando'
  }

  nuevoDictamen: any = {
    descripcion: '',
    idPersonal: 0
  }

  personal: any = {
    nombre: 'Cargando'
  }

  cargo: any = {
    cargo: 'Cargando'
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.idReporte) {
      this.getReporte(params.idReporte);
    }
    this.imgs = this.gallery.ref("imgs");
  }

  getReporte(idReporte: string) {
    this.reportesService.getReporte(idReporte).subscribe(
      res => {
        this.numbers = Array(this.reporte.imgs).fill(1).map((x, i) => i + 1);
        this.reporte = res;
        this.getConductor(this.reporte.idConductor);
        this.getVehiculo(this.reporte.placas);
        this.getImplicado(this.reporte.idImplicado);
        this.getDictamen(this.reporte.idDictamen);
        this.addImgs();
      },
      err => console.error(err)
    )
  }

  private getConductor(idConductor: string) {
    this.reportesService.getConductor(idConductor).subscribe(
      res => this.conductor = res,
      err => console.error(err)
    )
  }

  private getVehiculo(placas: string) {
    this.reportesService.getVehiculo(placas).subscribe(
      res => {
        this.vehiculo = res;
        if (this.vehiculo.idAseguradora != null) {
          this.getAseguradora(this.vehiculo.idAseguradora)
        }
      },
      err => console.error(err)
    )
  }

  private getAseguradora(idAseguradora: string) {
    this.reportesService.getAseguradora(idAseguradora).subscribe(
      res => this.aseguradora = res,
      err => console.error(err)
    )
  }

  private getImplicado(idImplicado: string) {
    this.reportesService.getImplicado(idImplicado).subscribe(
      res => {
        this.implicado = res;
        if (this.implicado.idAseguradora != null) {
          this.getAseguradoraImplicado(this.implicado.idAseguradora)
        }
      },
      err => console.error(err)
    )
  }

  private getAseguradoraImplicado(idAseguradora: string) {
    this.reportesService.getAseguradora(idAseguradora).subscribe(
      res => this.aseguradoraImplicado = res,
      err => console.error(err)
    )
  }

  private getDictamen(idDictamen: string) {
    if (idDictamen != null) {
      this.reportesService.getDictamen(idDictamen).subscribe(
        res => {
          this.dictamen = res;
          this.getPersonal(this.dictamen.idPersonal);
        },
        err => console.error(err)
      )
    }
  }

  private getPersonal(idPersonal: string) {
    this.reportesService.getPersonal(idPersonal).subscribe(
      res => {
        this.personal = res;
        this.getCargo(this.personal.idCargo);
      },
      err => console.error(err)
    )
  }

  private getCargo(idCargo: string) {
    this.reportesService.getCargo(idCargo).subscribe(
      res => this.cargo = res,
      err => console.error(err)
    )
  }

  newDictamen() {
    if (this.descripcion == '') {
      this.showSnackBar('Debes introducir la descripción del dictamen');
    } else {
      this.nuevoDictamen.descripcion = this.descripcion;
      this.nuevoDictamen.idPersonal = this.auth.getPersonal().idPersonal;
      this.personal = this.auth.getPersonal();
      this.getCargo(this.personal.idCargo);
      this.reportesService.newDictamen(this.nuevoDictamen).subscribe(
        res => {
          this.dictamen = res;
          this.putReporte();
        },
        err => console.error(err)
      )
    }
  }

  private putReporte() {
    this.reporte.idDictamen = this.dictamen.idDictamen;
    this.reportesService.putReporte(this.reporte.idReporte, this.reporte).subscribe(
      res => this.showSnackBar('Reporte actualizado correctamente'),
      err => console.error(err)
    )
  }

  private showSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, "", {
      duration: 2000
    });
  }

  verMapa() {
    window.open(`https://www.google.com/maps/search/${this.reporte.latitud},${this.reporte.longitud}`, '_blank')
  }

  private addImgs() {
    for(let i = 1; i <= this.reporte.imgs; i++)
    $("#imgs").append(`<li><a href="http://localhost:8080/api/reporte/img/${this.reporte.idReporte}/${i}" target="_blank">Foto ${i}</a></li>`)
  }

  verImg(img: number) {
    window.open(`http://localhost:8080/api/reporte/img/${this.reporte.idReporte}/${img}`, '_blank')
  }

}
