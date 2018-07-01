
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
  administrador: boolean;
  roles1:any;
  roles2:any;
  roles3:any;
  roles4:any;
  remiseriastring: any;
  preg7:any;
 token = localStorage.getItem('cliente');

       constructor(private PersonaS: PersonaService) {
        
       }

       ngOnInit() {

        debugger;
        
        var resp = this.PersonaS.obtenerRol(this.token,data => {
          
        this.rol = data.rol

        if(this.rol == "Cliente"){
          this.cliente = true;   
          
          var respuesta=  this.PersonaS.TraeViajePorUsuario(this.token , data => { 
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
        if(this.rol == "Encargado" ){
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
        if(this.rol == "Administrador" ){
          this.administrador = true;
         
            
            
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
          var respuesta=  this.PersonaS.TraerViajesPorRemisero(this.token,data => { 
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

      sweetalertDemo5(viaje) {
        debugger;
        swal({
          title: 'Modificar Estado',
          text: "¿Seguro que desea aprobar el viaje?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          CancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar!'
        }).then((result) => {
          if (result.value) {
            var respuesta=  this.PersonaS.EditarViaje(viaje.id,this.rol , mensaje => { 
              swal(
                'Modificado!',
                mensaje,
                'success'
              )         
              console.log(mensaje);      
  
            });
            window.location.reload();
            
            
          }
        });
        
        }

      download(){
        debugger;
        var csvData = this.ConvertToCSV(this.unarray);
        var a = document.createElement("a");
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        var blob = new Blob([csvData], { type: 'text/csv' });
        var url= window.URL.createObjectURL(blob);
        a.href = url;
       // let fecha1 = this.fecha.split('-');
      
        a.download = "Listado de Viajes.csv";
        a.click();
      }

      ConvertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        var row = "";
      
        for (var index in objArray[0]) {
            //Now convert each value to string and comma-separated
            row += index + ';';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        str += row + '\r\n';
      
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ';'
      
                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
      }
    
      cargarEncuesta(radio1,radio2,radio3, check1, check2, check3,check4){
        var hoy = new Date();
        var dia = hoy.getDate(); 
        var mes = hoy.getMonth() + 1;
        var anio= hoy.getFullYear();
        var fecha_actual = String(dia+"/"+mes +"/"+anio);
        debugger;
        
        if(this.roles1 == "1")
        var preg1 = "SI";
        if(this.roles1 == "2")
        var preg1= "NO";
        if(this.roles1 == "3")
        var preg1= "TAL VEZ";

        if(this.roles2 == "1")
        var preg2 = "BIEN";
        if(this.roles2 == "2")
        var preg2= "MAL";
        if(this.roles2 == "3")
        var preg2= "MASO";

        if(this.roles3 == "1")
        var preg3 = "BUENA";
        if(this.roles3 == "2")
        var preg3= "MALA";
        if(this.roles3 == "3")
        var preg3= "ALGUNOS BUENA";
        if(this.roles3 == "4")
        var preg3= "ALGUNOS MALA";

        if(this.roles4 == "1")
        var preg4 = "SI";
        if(this.roles4 == "2")
        var preg4= "NO";

        if(check1 == true)
        var checkstring1= "Familia"; 
        else
        var checkstring1= "";    
        if(check2 == true)
        var checkstring2= "Amigos";
        else
        var checkstring2= "";  
        if(check3 == true)
        var checkstring3= "Compañeros";
        else
        var checkstring3= "";
        if(check4 == true)
        var checkstring4= "A nadie";
        else
        var checkstring4= "";
        var preg5 =  this.remiseriastring;

        var preg6 =  checkstring1 +" "+ checkstring2 +" "+ checkstring3 +" "+ checkstring4;
        
        if(preg1 == "" || preg1 == undefined || preg2 == "" || preg2 == undefined || preg3 == "" || preg3 == undefined|| preg4 == "" || preg4 == undefined|| preg5 == "" || preg5 == undefined|| preg6 == "" || preg6== undefined|| this.preg7 == "" || this.preg7 == undefined){
          swal('ADVERTENCIA!',"Debe completar todos los campos",'error');
          
        }else{
       var respuesta=  this.PersonaS.CargarEncuesta(preg1,preg2,preg3,preg4,preg5,preg6,this.preg7,this.token, fecha_actual,mensaje => { 
          swal('OK!',mensaje,'success');
          
          console.log(mensaje);
        });
        }
 
      }

     change(radio1){
       if(radio1 == "1")
       this.preg7 =  "Una o más veces a la semana";
       if(radio1 == "2")
       this.preg7 =  "Dos o tres veces al mes";
       if(radio1 == "3")
       this.preg7 =  "Una vez al mes";
     }
        
  }
      
    

       
