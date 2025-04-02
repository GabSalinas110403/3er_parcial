import { Cita } from '../models/cita';
import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private db: Firestore = inject(Firestore);
  constructor() { }

    // Método para obtener todas las citas
    getCitas() {     
      const citasCollection = collection(this.db, 'citas');
      return collectionData(citasCollection, { idField: 'id' }).pipe(first());
    }
  
    // Método para agregar un documento a la colección citas
    agregarCita(cita: Cita) {
      if (!cita.cliente || !cita.motivo || !cita.mascota || !cita.estado || !cita.fecha || !cita.hora) {
        alert("Todos los campos son obligatorios. Por favor, completa la información.");
        return;
      }
    
      const citasCollection = collection(this.db, 'citas');
      const citaData = { 
        cliente: cita.cliente,
        motivo: cita.motivo,
        mascota: cita.mascota,
        estado: cita.estado,
        fecha: cita.fecha,
        hora: cita.hora, 
      };
    
      return addDoc(citasCollection, citaData)
        .then(() => alert("Cita agregada correctamente"))
        .catch(error => alert("Error al agregar la cita: " + error.message));
    }
  
    //metodo para modificar una cita
    modificarCita(cita: Cita) {
      const documentRef = doc(this.db, 'citas', cita.id);
      updateDoc(documentRef, {
        cliente: cita.cliente,
        motivo: cita.motivo,
        mascota: cita.mascota,
        estado: cita.estado,
        fecha: cita.fecha,
        hora: cita.hora, 
      });
    }
  
    //metodo para borrar una cita
    borrarCita(cita: Cita) {
      const documentRef = doc(this.db, 'citas', cita.id);
      deleteDoc(documentRef);
      alert("Registro eliminado correctamente");
    }
}