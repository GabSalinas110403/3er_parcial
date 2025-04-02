import { Component,inject } from '@angular/core';

import { Cita} from '../../models/cita';
import { CitaService } from '../../services/cita.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { Router } from '@angular/router';



@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.css'
})
export class CitaComponent {
  router: Router = inject(Router);

  //Propiedades 
  citas: any;
  cita = new Cita();

  //Constructor
  constructor(private citaService: CitaService) { 
    this.getCitas();
  }

  //metodo que hace la peticion para obtener las citas
  async getCitas(): Promise<void> {
    this.citas = await firstValueFrom(this.citaService.getCitas());
  }

  //metodo para agregar una cita
  insertarCita() {
    this.citaService.agregarCita(this.cita);
    this.getCitas();
    this.cita = new Cita();
  }

  //metodo para seleccionar una cita de la tabla
  selectCita(citaSeleccionado: Cita) {
    this.cita = citaSeleccionado;
  }

  //metodo para modificar una cita seleccionada
  updateCita() {
    this.citaService.modificarCita(this.cita);
    this.cita = new Cita();
    this.getCitas();
  }

  //metodo para eliminar una cita seleccionado
  deleteCita() {
    this.citaService.borrarCita(this.cita);
    this.cita = new Cita();
    this.getCitas();
  }

  //metodo para limpiar el formulario
  clearForm() {
    this.cita = new Cita();
  }

  irA(ruta: string) {
    console.log('Intentando ir a:', ruta);
    this.router.navigate([ruta]);
  }

}
