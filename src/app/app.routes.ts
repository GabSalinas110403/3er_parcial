import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './auth.guard';
import { CitaComponent } from './pages/cita/cita.component';
import { ClienteComponent } from './pages/cliente/cliente.component';


export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],  
  },
  {
    path: 'citas',
    component: CitaComponent,
    canActivate: [authGuard],  
  },  
  {
    path: 'clientes',
    component: ClienteComponent,
    canActivate: [authGuard],  
  },
  {
    path: '**',
    redirectTo: ''
  }
];
