
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from '../../google-map.directive';
import {PersonaService} from '../../services/persona.service';
import {} from '@types/googlemaps';
import swal from'sweetalert2';
import { concat } from 'rxjs/internal/operators/concat';


declare var google: any;
declare var jQuery: any;

export class Viaje {
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
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.scss'],
  providers : [ GoogleMapsAPIWrapper ]
})
export class ViajeComponent implements OnInit {

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
    private origenLat: any;
    private origenLng: any;
    private destinoLat: any;
    private destinoLng: any;
    private objViaje: Viaje;

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


  private rol: string;
  private cliente:boolean;
       @ViewChild('pickupInput') pickupInputElementRef: ElementRef;

       @ViewChild('pickupOutput') pickupOutputElementRef: ElementRef;

       @ViewChild('scrollMe')
       private scrollContainer: ElementRef;

       @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;
       isChecked:boolean;
       testModel:string;
       public origin: any ; // its a example aleatory position
       public destination: any; // its a example aleatory position
       constructor(
         private mapsAPILoader: MapsAPILoader,
         private ngZone: NgZone,
         private gmapsApi: GoogleMapsAPIWrapper,
         private _elementRef: ElementRef,
        private PersonaS: PersonaService  ) {
           const date = new Date();
           const year = date.getFullYear();
           const month = date.getMonth();
           const day = date.getDay();

           this.startDate = new Date(year, month, day);
              // create search FormControl
         this.destinationInput = new FormControl();
         this.destinationOutput = new FormControl();
       }

       ngOnInit() {
        debugger;
       
        var token = localStorage.getItem('cliente');
        
        var resp = this.PersonaS.obtenerRol(token,data => {
          
        this.rol = data.rol

        if(this.rol == "Cliente" || this.rol =="Encargado" ||  this.rol == "Administrador"){
          this.cliente = true;   
          
        }
      });
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
      //  private myCheck(i, bool){
      //     debugger;
      //     if(i == 'CA' && bool == false){
      //     this.aireAcondicionado = "Con Aire Acondicionado";
      //     this.CAbool = true;
      //     }if(i == 'CA' && bool == true){
      //     this.aireAcondicionado = "";
      //     this.CAbool = false;
      //     }
      //     if(i == 'SAC' && bool == false){
      //     this.SinAireAcondicionado = "Sin Aire Acondicionado";
      //     this.SACbool = true;
      //     }if(i == 'SAC' && bool == true){
      //     this.SinAireAcondicionado = "";
      //     this.SACbool = false;
      //     }
      //     if(i == '3P' && bool == false){
      //     this.tresPuertas = "3 puertas";
      //     this.tresPbool = true;
      //     }if(i == '3P' && bool == true){
      //     this.tresPuertas = "";
      //     this.tresPbool = false;
      //     }
      //     if(i == '5P' && bool == false){
      //     this.cincoPuertas = "5 puertas";
      //     this.cincoPbool = true;
      //     }if(i == '5P' && bool == true){
      //     this.cincoPuertas = "";
      //     this.cincoPbool = false;
      //     }
      //     if(i == 'CAM' && bool == false){
      //     this.camioneta = "Camioneta";
      //     this.CAMbool = true;
      //     }if(i == 'CAM' && bool == true){
      //     this.camioneta = "";
      //     this.CAMbool = false;
      //     }
      //     if(i == 'AU' && bool == false){
      //     this.auto = "Auto";
      //     this.AUbool = true;
      //     }if(i == 'AU' && bool == true){
      //     this.auto = "";
      //     this.AUbool = false;
      //     }
      //  }
       private getMapCusotmStyles() {
         // Write your Google Map Custom Style Code Here.
       }

       private validarCampos() {

       }
       pedirViaje(CAbool,tresPbool, cincoPbool,SACbool, CAMbool,AUbool) {
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
            });
          }
           
        //    this.PersonaS.CargarViaje( this.objViaje 
        //    .then( data => {
        //         console.log(data);
        //        /*
        //          hacer la logica para que si no existe el mail.
        //          Vaya a registrarase.
        //        */
        //       //  if ( data.token ) {
        //       //       localStorage.setItem('token', data.token);
        //       //       this.router.navigateByUrl('/bienvenida');
        //       //  }
        //    })
        // //    .catch( e => {
        //        console.log(e);
        //    } );
           // console.log(this.objViaje);
       }

      
}