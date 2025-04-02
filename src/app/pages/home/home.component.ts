import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  // Verifica si el usuario está logueado cuando se carga el componente
  constructor() {
    this.authService.user$.subscribe(user => {
      if (user) {
        console.log('Usuario autenticado:', user);  // Verifica que el usuario está logueado
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }

  salir() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }

  irA(ruta: string) {
    console.log('Intentando ir a:', ruta);
    this.router.navigate([ruta]);
  }
}
