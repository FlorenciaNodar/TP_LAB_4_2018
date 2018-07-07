
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

declare var google: any;
declare var jQuery: any;

export class Viaje {
  public id: any;
  public lat_o: any;
  public lng_o: any;
  public lat_d: any;
  public lng_d: any;
  public fechayhora: any;
  public tipo_pago: any;
  public token: any;
  public prestaciones: any;
  public estado: any;
  

  constructor() { }
}
@Component({
  selector: 'app-misviajes',
  templateUrl: './misviajes.component.html',
  styleUrls: ['./misviajes.component.scss'],
  providers : [ GoogleMapsAPIWrapper ]
  
})
export class MisViajesComponent implements OnInit {
  public idViajeSeleccionado: any;
  
    private listViajes: any;
    private unarray =[];
    private remises =[];
    private unarray1 =[];
    rol: string;
    seAbrioRemisero: boolean;    
    seAbrioCosto: boolean;
    seAbrio: boolean;
  cliente: boolean;
  remisero: boolean;
  encargado: boolean;
  administrador: boolean;
  roles1:any;
  roles2:any;
  roles3:any;
  roles4:any;
  private objViaje: Viaje;
  
  remiseriastring: any;
  preg7:any;
  public latitude: number;
  public longitude: number;
  public destinationInput: FormControl;
  public destinationOutput: FormControl;
  public zoom: number;
  public iconurl: string;
  public mapCustomStyles: any;
  public estimatedTime: any;
  public estimatedKm: any;
  public estimatedKma: any;
  public estimatedCosto: any;
  
  public estimatedDistance: any;
  public startDate: any;
  public fechaViaje: any;
  public prestaciones: any;
  public metodoPago: any;
  public metodoPago1: any;
  private origenLat: any;
  private origenLng: any;
  private destinoLat: any;
  private destinoLng: any;

private CAbool:false;
private aireAcondicionado: string;
private SACbool: false;
private SinAireAcondicionado: string;
private tresPbool:false;
private tresPuertas: string;
private cincoPbool:false;
private cincoPuertas: string;
private AUbool:false;
private auto: string;
private CAMbool:false;
private camioneta: string;


     @ViewChild('pickupInput') pickupInputElementRef: ElementRef;

     @ViewChild('pickupOutput') pickupOutputElementRef: ElementRef;

     @ViewChild('scrollMe')
     private scrollContainer: ElementRef;

     @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;
     isChecked:boolean;
     testModel:string;
     public origin: any ; // its a example aleatory position
     public destination: any; // its a example aleatory position
 token = localStorage.getItem('cliente');

       constructor( private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private gmapsApi: GoogleMapsAPIWrapper,
        private _elementRef: ElementRef,
       private PersonaS: PersonaService ) {
        
       }

       ngOnInit() {


        var respuesta=  this.PersonaS.TraeUsuariosRemiseros(mensaje => { 
          mensaje.forEach(element => {
            
                      this.remises.push(element);
            
                      console.log(  this.remises);
                      });    
    
        });
         this.seAbrioRemisero= false;
         this.seAbrioCosto = false;
         this.seAbrio = false;
        this.objViaje = new Viaje();
        // set google maps defaults
        this.zoom = 4;
        this.latitude = -34.603722;
        this.longitude = -58.381592;

        this.iconurl = '../image/map-icon.png';

       // this.mapCustomStyles = this.getMapCusotmStyles();
     

        // set current position
        this.setCurrentPosition();
        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            const autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
                    types: ['address']
           });

            const autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
                       types: ['address']
           });

           debugger;
           this.setupPlaceChangedListener(autocompleteInput, 'ORG');
           this.setupPlaceChangedListener(autocompleteOutput, 'DES');
        });
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
            if(element.costo == null || element.costo == ""){
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
              if(element.costo == null|| element.costo == ""){
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
              if(element.costo == null || element.costo == ""){
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
              if(element.costo == null|| element.costo == ""){
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

      
      setupPlaceChangedListener(autocomplete: any, mode: any ) {
        debugger;
        autocomplete.addListener('place_changed', () => {
              this.ngZone.run(() => {
                // get the place result
                const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                // verify result
                if (place.geometry === undefined) {
                  return;
                }
                if (mode === 'ORG') {
                    this.vc.origin = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() };
                    this.vc.originPlaceId = place.place_id;
                } else {
                    this.vc.destination = {
                        longitude: place.geometry.location.lng(),
                        latitude: place.geometry.location.lat()
                    }; // its a example aleatory position
                    this.vc.destinationPlaceId = place.place_id;
                }

                if (this.vc.directionsDisplay === undefined) {
                       this.mapsAPILoader.load().then(() => {
                        this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
                    });
              }

                // Update the directions
                this.vc.updateDirections();
                this.zoom = 12;
              //  this.getDistanceAndDuration();
                if (this.vc.destination !== undefined ) {
                   this.origenLat = this.vc.origin.latitude;
                   this.origenLng = this.vc.origin.longitude;
                   this.destinoLat = this.vc.destination.latitude;
                   this.destinoLng = this.vc.destination.longitude;
                }

                this.estimatedTime = localStorage.getItem('duracion');
                this.estimatedKma = Math.floor((Math.random() * 100) + 1);
                this.estimatedKm = this.estimatedKma+"km";
                this.estimatedCosto = this.estimatedKma * 16;
              });

           });

      }

     //  getDistanceAndDuration() {
     //    this.estimatedTime = this.vc.estimatedTime;
     //    this.estimatedDistance = this.vc.estimatedDistance;
     //  }

      scrollToBottom(): void {
        jQuery('html, body').animate({ scrollTop: jQuery(document).height() }, 3000);
      }
      private setPickUpLocation( place: any ) {
        // verify result
              if (place.geometry === undefined || place.geometry === null) {
                return;
              }
              // set latitude, longitude and zoom
              this.latitude = place.geometry.location.lat();
              this.longitude = place.geometry.location.lng();
              this.zoom = 12;
      }

      private setCurrentPosition() {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.zoom = 12;
          });
        }
      }
 
      private getMapCusotmStyles() {
        // Write your Google Map Custom Style Code Here.
      }

      private validarCampos() {

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

        
      sweetalertDemo6(viaje) {
        debugger;
        swal({
          title: 'Modificar Estado',
          text: "¿Seguro que desea cancelar el viaje?",
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

     modificar(viaje){
       this.seAbrio = true;
       this.metodoPago1 = 1;
      // fechaViaje.id = viaje.id;
      //  this.fechaViaje = viaje.dia;
      //   // prestaciones = viaje.prestaciones;
      //   // nuevo.lat_d = viaje.destinoLat;
      //   // nuevo.lat_o  = viaje.origenLat;
      //   // nuevo.lng_d = viaje.destinoLng;
      //   // nuevo.lng_o = viaje.origenLng;
      //   this.metodoPago1 = viaje.pago;

console.log(viaje);
console.log(JSON.parse(viaje));
     this.fechaViaje = JSON.stringify(viaje.dia);
        // this.metodoPago1 = nuevo.tipo_pago;
     debugger;
      }
     modificarViaje(CAbool,tresPbool, cincoPbool,SACbool, CAMbool,AUbool) {
      // this.validarCampos();
      debugger;
      
      this.objViaje.lat_o = this.origenLat;
      this.objViaje.lng_o = this.origenLng;
      this.objViaje.lat_d = this.destinoLat;
      this.objViaje.lng_d = this.destinoLng;

      if(CAbool == true)
      this.aireAcondicionado = "Con Aire Acondicionado";
      if(cincoPbool == true)
      this.cincoPuertas = "5 Puertas";
      if(tresPbool == true)
      this.tresPuertas = "3 Puertas";
      if(CAMbool == true)
      this.camioneta = "Camioneta";
      if(AUbool == true)
      this.auto = "Auto";
      if(SACbool == true)
      this.SinAireAcondicionado = "Sin Aire Acondicionado";


      if(this.metodoPago == "1"){
       this.objViaje.tipo_pago = "Efectivo";            
      }else if(this.metodoPago == "2"){
       this.objViaje.tipo_pago = "Debito";                        
      }else{
       this.objViaje.tipo_pago = "Credito";                        
      }
      this.objViaje.fechayhora = this.fechaViaje;
      if(this.aireAcondicionado == undefined){
       this.aireAcondicionado = "";
      }
      if(this.SinAireAcondicionado == undefined){
       this.SinAireAcondicionado = "";
      }
      if(this.auto == undefined){
       this.auto = "";
      }
      if(this.camioneta == undefined){
       this.camioneta = "";
      }
      if(this.tresPuertas == undefined){
       this.tresPuertas = "";
      }
      if(this.cincoPuertas == undefined){
       this.cincoPuertas = "";
      }
      this.objViaje.prestaciones = this.aireAcondicionado+" "+this.SinAireAcondicionado+" "+this.auto+" "+this.camioneta+" "+this.tresPuertas+" "+this.cincoPuertas;
      this.objViaje.estado = "Solicitado";
      this.objViaje.token = localStorage.getItem('cliente');

       console.log(this.objViaje);
       if(this.objViaje.fechayhora == "" || this.objViaje.prestaciones == "" || this.objViaje.tipo_pago == "" || this.objViaje.fechayhora == undefined|| this.objViaje.lng_d == undefined || this.objViaje.lat_d == undefined  || this.objViaje.prestaciones == undefined|| this.objViaje.tipo_pago == undefined)
     {
       swal('ADVERTENCIA!','Debe cargar todos los campos','error');
       
     }else{
        var respuesta=  this.PersonaS.CargarViaje(this.objViaje , mensaje => { 
         swal('OK!',mensaje,'success');
         
         console.log(mensaje);
         this.origenLat="";
          this.origenLng="";
          this.destinoLat="";
         this.destinoLng="";
        this.metodoPago = "";
         this.fechaViaje="";
         this.prestaciones="";
         this.estimatedCosto="";
         this.estimatedKm="";
       });
     }
      
  }

  modificarRemisero(viaje)
  {
    debugger;
    this.idViajeSeleccionado = viaje.id;

    this.seAbrioRemisero = true;
   
  
  }

  cancelarRemisero(){
    this.seAbrioRemisero = false;
 
    this.unarray = [];
      var respuesta=  this.PersonaS.TraerTodosLosViajes(data => { 
        data.forEach(element => {

        this.unarray1.push(element);
        this.listViajes = this.unarray;
        this.unarray1.forEach(element => {
          if(element.costo == null || element.costo == ""){
              element.costo = "A confirmar por el remisero";
          }
        });
        this.unarray.push(element);

        });
     });
    
    
  }
  modificarRemis(remisero){
    debugger;
    // this.remisero = 
     var respuesta=  this.PersonaS.EditarViajeRemisero(this.idViajeSeleccionado, remisero, data => { 
      swal(
        'Modificado!',
        data,
        'success'
      )         
      });

    this.seAbrioRemisero = false;
    this.unarray = [];
    var respuesta=  this.PersonaS.TraerTodosLosViajes(data => { 
      data.forEach(element => {

      this.unarray1.push(element);
      this.listViajes = this.unarray;
      this.unarray1.forEach(element => {
        if(element.costo == null || element.costo == ""){
            element.costo = "A confirmar por el remisero";
        }
      });
      this.unarray.push(element);

      });
   });
    
   
  }

  AgregarPago(item){
    this.idViajeSeleccionado = item.id;
    
    this.seAbrioCosto = true;
  }

  modificarCosto(plata)
  {
    var respuesta=  this.PersonaS.EditarViajeCosto(this.idViajeSeleccionado, plata, data => { 
      swal(
        'Modificado!',
        data,
        'success'
      )         
      });

      this.seAbrioCosto = false;
      this.unarray = [];
      var respuesta=  this.PersonaS.TraerViajesPorRemisero(this.token,data => { 
        data.forEach(element => {

        this.unarray1.push(element);
        this.listViajes = this.unarray;
        this.unarray1.forEach(element => {
          if(element.costo == null|| element.costo == ""){
              element.costo = "A confirmar por el remisero";
          }
        });
        this.unarray.push(element);

        console.log(  this.unarray);
        });
     });
  }

  cancelarCosto(){
    this.seAbrioCosto = false;
    
       this.unarray = [];
       var respuesta=  this.PersonaS.TraerViajesPorRemisero(this.token,data => { 
        data.forEach(element => {

        this.unarray1.push(element);
        this.listViajes = this.unarray;
        this.unarray1.forEach(element => {
          if(element.costo == null|| element.costo == ""){
              element.costo = "A confirmar por el remisero";
          }
        });
        this.unarray.push(element);

        console.log(  this.unarray);
        });
     });
  }

        
  }
      
    

       
