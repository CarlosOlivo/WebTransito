import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilComponent
  },
  {
    path: 'acceso',
    component: AccesoComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'reportes',
    component: ReportesComponent
  },
  {
    path: 'reportes/view/:idReporte',
    component: ReporteComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
