
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from '../../google-map.directive';
import {PersonaService} from '../../services/persona.service';
import {} from '@types/googlemaps';
import swal from'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';


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
  destinationOutput0: any;
  destinoLongitudViaje: any;
  destinoLatitudViaje: any;
  origenLatitudViaje1: any;
  listDirections: any;
  destinationInput0: any;
  data = [];
  origenLatitudViaje: any;
  origenLongitudViaje: any;
  unarray: any[];

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
    private CAbool:boolean;
    private aireAcondicionado: string;
    private SACbool: boolean;
    private SinAireAcondicionado: string;
    private tresPbool:boolean;
    private tresPuertas: string;
    private cincoPbool:boolean;
    private cincoPuertas: string;
    private AUbool:boolean;
    private auto: string;
    private CAMbool:boolean;
    private camioneta: string;
    private rol: string;
    private cliente:boolean;
    isChecked:boolean;
    testModel:string;
    public captchaView: any;
    public captchaRespuesta: any;
    public captchaError: boolean;
    public idDelViaje: any;
    public origin: any ; // its a example aleatory position
    public destination: any; // its a example aleatory position

    @ViewChild('pickupInput') pickupInputElementRef: ElementRef;

    @ViewChild('pickupOutput') pickupOutputElementRef: ElementRef;

    @ViewChild('scrollMe')
    private scrollContainer: ElementRef;

    @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;
    cargarViaje: any;

    listo:boolean;
    administrador:boolean;
    remisero:boolean;
    encargado:boolean;

    constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private gmapsApi: GoogleMapsAPIWrapper,
    private _elementRef: ElementRef,
    private PersonaS: PersonaService ,
    private route: ActivatedRoute, private http: HttpClient,private spinner: NgxSpinnerService ) {

    this.route.params.subscribe( params => this.idDelViaje= params.id); 

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
          
    this.startDate = new Date(year, month, day);
    this.destinationInput = new FormControl();
    this.destinationOutput = new FormControl();

    
    }

       ngOnInit() {
       
        this.listo = false;
        
         if(this.idDelViaje == undefined){
          this.SACbool = false;
          this.tresPbool = false;
          this.CAMbool = false;
          this.AUbool = false;
          this.CAbool = false;
          this.cincoPbool = false;
          this.cargarViaje = "Cargar"
         }else{
           this.traerViajePorId();
          this.cargarViaje = "Modificar"          
         }
              
        this.cargarCaptcha();
        var token = localStorage.getItem('cliente');
        
        var resp = this.PersonaS.obtenerRol(token,data => {
          
        this.rol = data.rol

        if(this.rol == "Cliente" || this.rol =="Encargado" ||  this.rol == "Administrador"){
          this.cliente = true;   
          this.listo = true;
        }
        if(this.rol == "Remisero")
        {
          this.remisero = true;   
          this.listo = true;
          
        }
        });
        this.objViaje = new Viaje();
  
        // this.mapCustomStyles = this.getMapCusotmStyles();
         
        if(this.listo = true){
          this.spinner.show();
          
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
            this.listo = false;
            
        }, 8000);
        }
       }

       mapa(){
             
       // set google maps defaults
       this.zoom = 4;
       this.latitude = -34.603722;
       this.longitude = -58.381592;

       this.iconurl = '../image/map-icon.png';

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

                  
            this.setupPlaceChangedListener(autocompleteInput, 'ORG');
            this.setupPlaceChangedListener(autocompleteOutput, 'DES');
         });
       }

       setupPlaceChangedListener(autocomplete: any, mode: any ) {
               
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
       pedirViaje(CAbool,tresPbool, cincoPbool,SACbool, CAMbool,AUbool) {
           // this.validarCampos();
          
           
            if (true === this.captchaError) {
              return false;
            }

            if (!this.validarCaptcha()) {
              this.captchaError = true;
              return false;
            }
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

            if(this.objViaje.fechayhora == "" || this.objViaje.prestaciones == "" || this.objViaje.tipo_pago == "" || this.objViaje.fechayhora == undefined|| this.objViaje.lng_d == undefined || this.objViaje.lat_d == undefined  || this.objViaje.prestaciones == undefined|| this.objViaje.tipo_pago == undefined)
          {
            swal('ADVERTENCIA!','Debe cargar todos los campos','error');
            
          }else{
            if(this.idDelViaje != undefined){
              
              var respuesta=  this.PersonaS.EditarViajePorId(this.objViaje, this.idDelViaje , mensaje => { 
                swal('OK!',mensaje,'success');
                
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
            }else{
                           
               var respuesta=  this.PersonaS.CargarViaje(this.objViaje , mensaje => { 
                swal('OK!',mensaje,'success');
                
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
         
           
       }

        cargarCaptcha() {
        const CADENA = 'abcdefghijqlmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let numero: any;
        let stringCaptcha: any;

        this.captchaError = false;
        stringCaptcha = '';
        for (let i = 0; i < 6; i++) {
            numero = Math.floor(Math.random() * (CADENA.length - 1));
            stringCaptcha += CADENA[numero];
        }
        this.captchaView = stringCaptcha;
        }

        validarCaptcha() {
        if (this.captchaView !== this.captchaRespuesta) {
            return false;
        }
        return true;
        }


        traerViajePorId()
        {
          var respuesta=  this.PersonaS.TraerViajePorId(this.idDelViaje,data => { 
           
            if(data[0].pago== "Efectivo")
            this.metodoPago = "1" ;
            if(data[0].pago== "Debito")
            this.metodoPago = "2" ;
            if(data[0].pago== "Credito")
            this.metodoPago = "3" ;
            this.fechaViaje = data[0].dia;

            var str = data[0].prestaciones;
            if(str.indexOf('Con Aire Acondicionado') != -1){
              this.CAbool=true;
            }
            if(str.indexOf('5 Puertas') != -1){
              this.cincoPbool=true;
            }
            if(str.indexOf('3 Puertas') != -1){
              this.tresPbool=true;
            }
            if(str.indexOf('Sin Aire Acondicionado') != -1){
              this.SACbool=true;
            }
            if(str.indexOf('Camioneta') != -1){
              this.CAMbool=true;
            }
            if(str.indexOf('Auto') != -1){
              this.AUbool=true;
            }
            
            this.origenLatitudViaje = data[0].origenlat;
            this.origenLongitudViaje =data[0].origenlong;
            this.destinoLatitudViaje =data[0].destinolat;
            this.destinoLongitudViaje =data[0].destinolong;

            this.getDataOrigen().subscribe(data => {
              this.data.push(data);
              this.data.forEach(element => {
              this.destinationInput0 =  element.results[0].formatted_address;
              });

          });
          this.getDataDestino().subscribe(data => {
            this.data.push(data);
            this.data.forEach(element => {
              this.destinationOutput0 =  element.results[0].formatted_address;
            });

        });

          
          });
        }

        getDataOrigen(){
          return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.origenLatitudViaje+','+this.origenLongitudViaje+'&key=AIzaSyDyFfo561pm54EAGnMs72i7LyudqeHicXI')
          .map(response => response);
        }
        
        getDataDestino(){
          return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.destinoLatitudViaje+','+this.destinoLongitudViaje+'&key=AIzaSyDyFfo561pm54EAGnMs72i7LyudqeHicXI')
          .map(response => response);
        }
      
        
    
      
}