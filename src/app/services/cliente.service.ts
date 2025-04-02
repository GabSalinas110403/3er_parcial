import { Cliente } from './../models/cliente';
import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private db: Firestore = inject(Firestore);
  constructor() { }


    // Método para obtener todas las clientes
    getClientes() {     
      const clientesCollection = collection(this.db, 'clientes');
      return collectionData(clientesCollection, { idField: 'id' }).pipe(first());
    }
  
    // Método para agregar un documento a la colección clientes
    agregarCliente(cliente: Cliente) {
      if (!cliente.nombre || !cliente.telefono || !cliente.correo || !cliente.direccion || !cliente.mascota) {
        alert("Todos los campos son obligatorios. Por favor, completa la información.");
        return;
      }
    
      const clientesCollection = collection(this.db, 'clientes');
      const clienteData = { 
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        correo: cliente.correo,
        direccion: cliente.direccion,
        mascota: cliente.mascota,
      };
    
      return addDoc(clientesCollection, clienteData)
        .then(() => alert("Cliente agregada correctamente"))
        .catch(error => alert("Error al agregar el cliente: " + error.message));
    }
  
    //metodo para modificar un cliente
    modificarCliente(cliente: Cliente) {
      const documentRef = doc(this.db, 'clientes', cliente.id);
      updateDoc(documentRef, {
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        correo: cliente.correo,
        direccion: cliente.direccion,
        mascota: cliente.mascota,
      });
    }
  
    //metodo para borrar un cliente
    borrarCliente(cliente: Cliente) {
      const documentRef = doc(this.db, 'clientes', cliente.id);
      deleteDoc(documentRef);
      alert("Registro eliminado correctamente");
    }
}
