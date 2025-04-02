import { Component, inject } from '@angular/core';

import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  
  router: Router = inject(Router);

//Propiedades 
  clientes: any;
  cliente = new Cliente();

  //Constructor
  constructor(private clienteService: ClienteService) { 
    this.getClientes();
  }

  //metodo que hace la peticion para obtener los clientes
  async getClientes(): Promise<void> {
    this.clientes = await firstValueFrom(this.clienteService.getClientes());
  }

  //metodo para agregar un cliente
  insertarCliente() {
    this.clienteService.agregarCliente(this.cliente);
    this.getClientes();
    this.cliente = new Cliente();
  }

  //metodo para seleccionar una cliente de la tabla
  selectCliente(clienteSeleccionado: Cliente) {
    this.cliente = clienteSeleccionado;
  }

  //metodo para modificar una cliente seleccionada
  updateCliente() {
    this.clienteService.modificarCliente(this.cliente);
    this.cliente = new Cliente();
    this.getClientes();
  }

  //metodo para eliminar una cliente seleccionado
  deleteCliente() {
    this.clienteService.borrarCliente(this.cliente);
    this.cliente = new Cliente();
    this.getClientes();
  }

  //metodo para limpiar el formulario
  clearForm() {
    this.cliente = new Cliente();
  }

  irA(ruta: string) {
    console.log('Intentando ir a:', ruta);
    this.router.navigate([ruta]);
  }

}
