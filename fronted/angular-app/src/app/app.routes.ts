import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    component: RegistroComponent
  }
  // Agrega aquí más rutas según necesites
];

