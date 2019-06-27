import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  cargos: any;
  registro: any = {
    idCargo: '',
    nombre: '',
    usuario: '',
    contrasenia: ''
  }

  constructor(private snackBar: MatSnackBar, private auth: AuthService) { }

  ngOnInit() {
    this.getCargos();
  }

  private getCargos() {
    this.auth.getCargos().subscribe(
      res => this.cargos = Object.values(res),
      err => console.error(err)
    )
  }

  login() {
    if (this.registro.idCargo == '') {
      return this.showSnackBar('Selecciona un cargo');
    }
    if (this.registro.nombre == '') {
      return this.showSnackBar('Introduce un nombre');
    }
    if (this.registro.usuario == '') {
      return this.showSnackBar('Introduce un usuario');
    }
    if (this.registro.contrasenia == '') {
      return this.showSnackBar('Introduce una contraseña');
    }
    this.auth.registro(this.registro).subscribe(
      res => {
        if (res != null) {
          this.auth.setPersonal(res);
          window.location.pathname = '';
        } else {
          console.error(res);
        }
      },
      err => console.error(err)
    )
  }

  private showSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'CERRAR', {
      duration: 2000
    });
  }

}
