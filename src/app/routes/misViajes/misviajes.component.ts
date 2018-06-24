
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from '../../google-map.directive';
import {} from '@types/googlemaps';
import {PersonaService} from '../../services/persona.service';
import { debug } from 'util';
import swal from'sweetalert2';
import { element } from 'protractor';

@Component({
  selector: 'app-misviajes',
  templateUrl: './misviajes.component.html',
  styleUrls: ['./misviajes.component.scss']
})
export class MisViajesComponent implements OnInit {

    private listViajes: any;
    private unarray =[];
    private unarray1 =[];
    rol: string;
  cliente: boolean;
  remisero: boolean;
  encargado: boolean;
       constructor(private PersonaS: PersonaService) {
        
       }

       ngOnInit() {

        debugger;
        var token = localStorage.getItem('cliente');
        
        var resp = this.PersonaS.obtenerRol(token,data => {
          
        this.rol = data.rol

        if(this.rol == "Cliente"){
          this.cliente = true;   
          
          var respuesta=  this.PersonaS.TraeViajePorUsuario(token , data => { 
          data.forEach(element => {

          this.unarray1.push(element);
          this.listViajes = this.unarray;
          this.unarray1.forEach(element => {
            if(element.costo == null){
                element.costo = "A confirmar por el remisero";
            }
          });
          this.unarray.push(element);

          console.log(  this.unarray);
          });
       });
        }
        if(this.rol == "Encargado"){
          this.encargado = true;
            
          var respuesta=  this.PersonaS.TraerTodosLosViajes(data => { 
            data.forEach(element => {
  
            this.unarray1.push(element);
            this.listViajes = this.unarray;
            this.unarray1.forEach(element => {
              if(element.costo == null){
                  element.costo = "A confirmar por el remisero";
              }
            });
            this.unarray.push(element);
  
            console.log(  this.unarray);
            });
         });
        }
        if(this.rol == "Remisero"){
          this.remisero = true;
        //   var respuesta=  this.PersonaS.TraerViajeRemisero(token,data => { 
        //     data.forEach(element => {
  
        //     this.unarray1.push(element);
        //     this.listViajes = this.unarray;
        //     this.unarray1.forEach(element => {
        //       if(element.costo == null){
        //           element.costo = "A confirmar por el remisero";
        //       }
        //     });
        //     this.unarray.push(element);
  
        //     console.log(  this.unarray);
        //     });
        //  });
        }
 
        
        });

     
        
      
      }
      
    sweetalertDemo4(viaje) {
      debugger;
      swal({
        title: 'Eliminar',
        text: "¿Seguro que desea eliminar el viaje?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        CancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar!'
      }).then((result) => {
        if (result.value) {
          var respuesta=  this.PersonaS.BorrarViaje(viaje.id , mensaje => { 
            swal(
              'Eliminado!',
              mensaje,
              'success'
            )            
            console.log(mensaje);      

          });
          window.location.reload();
          
        }
      });
      
      }
        
   
         //this.classicModal.show();
  }
      
    

       
