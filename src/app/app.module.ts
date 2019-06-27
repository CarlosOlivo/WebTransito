import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GalleryModule } from '@ngx-gallery/core';
import { GALLERY_CONFIG } from '@ngx-gallery/core';

import { ReportesService } from './services/reportes.service';

import { ReportesComponent } from './components/reportes/reportes.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AccesoComponent } from './components/acceso/acceso.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportesComponent,
    ReporteComponent,
    NavigationComponent,
    PerfilComponent,
    AccesoComponent,
    RegistroComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    GalleryModule
  ],
  providers: [ReportesService, 
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: true,
        loadingStrategy: 'lazy',
        loadingMode: 'indeterminate',
        disableThumb: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
