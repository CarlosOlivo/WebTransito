import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  personal: any = null;
  cargo: any = {
    idCargo: null,
    cargo: "Cargando"
  };

  constructor(private auth: AuthService, private service: ReportesService) { }

  ngOnInit() {
    this.personal = this.auth.getPersonal();
    if (this.personal != null) {
      this.service.getCargo(this.personal.idCargo).subscribe(
        res => this.cargo = res,
        err => console.error(err)
      )
    }
  }

}
