import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';
import { MatTableDataSource } from '@angular/material'
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  columns: string[] = ['idReporte', 'fechaHora', 'idDictamen', 'placas', 'latitud', 'longitud', 'acciones'];
  reportes: any = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private reportesService: ReportesService) { }

  ngOnInit() {
    this.reportes.sort = this.sort;
    this.getReportes();
  }

  getReportes() {
    this.reportesService.getReportes().subscribe(
      res => this.reportes.data = res,
      err => console.error(err)
    )
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.reportes.filter = filterValue.trim().toLowerCase();
  }

}
