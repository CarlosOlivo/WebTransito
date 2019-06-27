import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {

  usuario: string = '';
  contrasenia: string = '';

  constructor(private snackBar: MatSnackBar, private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    if (this.usuario == '') {
      return this.showSnackBar('Introduce el usuario');
    }
    if (this.contrasenia == '') {
      return this.showSnackBar('Introduce la contraseña');
    }
    this.auth.login(this.usuario, this.contrasenia).subscribe(
      res => {
        if (res != null) {
          this.auth.setPersonal(res);
          window.location.pathname = '';
        } else {
          this.showSnackBar('Usuario y/o contraseña incorrectas');
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
