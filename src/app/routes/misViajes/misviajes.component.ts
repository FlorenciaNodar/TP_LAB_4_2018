// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from "rxjs/Observable";
// @Component({
//     selector: 'app-viaje',
//     templateUrl: './viaje.component.html',
//     styleUrls: ['./viaje.component.scss']
// })
// export class ViajeComponent implements OnInit {

//     lat: number = 51.678418;
//     lng: number = 7.809007;
//     constructor(public http: HttpClient) { 
//         this.getChartData('assets/server/chart/area.json').subscribe(data => this.areaData = data);
//     }
//     getChartData(url): Observable<any> {
//         return this.http.get(url);
//     }
//     ngOnInit() {
//     }

//     areaData: any;
//     areaOptions = {
//         series: {
//             lines: {
//                 show: true,
//                 fill: 0.8
//             },
//             points: {
//                 show: true,
//                 radius: 4
//             }
//         },
//         grid: {
//             borderColor: '#eee',
//             borderWidth: 1,
//             hoverable: true,
//             backgroundColor: '#fcfcfc'
//         },
//         tooltip: true,
//         tooltipOpts: {
//             content: function(label, x, y) { return x + ' : ' + y; }
//         },
//         xaxis: {
//             tickColor: '#fcfcfc',
//             mode: 'categories'
//         },
//         yaxis: {
//             min: 0,
//             tickColor: '#eee',
//             // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
//             tickFormatter: function(v) {
//                 return v + ' visitors';
//             }
//         },
//         shadowSize: 0
//     };

    
//     ready($event) {
//         // $event == { plot: PlotObject }
//         console.log('Ready!');
//     }

    

// }
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { DirectionsMapDirective } from '../../google-map.directive';
import {} from '@types/googlemaps';


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

  constructor() { }
}

@Component({
  selector: 'app-misviajes',
  templateUrl: './misviajes.component.html',
  styleUrls: ['./misviajes.component.scss'],
  providers : [ GoogleMapsAPIWrapper ]
})
export class MisViajesComponent implements OnInit {

    public latitude: number;
    public longitude: number;
    public destinationInput: FormControl;
    public destinationOutput: FormControl;
    public zoom: number;
    public iconurl: string;
    public mapCustomStyles: any;
    public estimatedTime: any;
    public estimatedDistance: any;
    public startDate: any;
    public fechaViaje: any;
    public metodoPago: any;
    private origenLat: any;
    private origenLng: any;
    private destinoLat: any;
    private destinoLng: any;
    private objViaje: Viaje;

       @ViewChild('pickupInput') pickupInputElementRef: ElementRef;

       @ViewChild('pickupOutput') pickupOutputElementRef: ElementRef;

       @ViewChild('scrollMe')
       private scrollContainer: ElementRef;

       @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;

       public origin: any ; // its a example aleatory position
       public destination: any; // its a example aleatory position
       constructor(
         private mapsAPILoader: MapsAPILoader,
         private ngZone: NgZone,
         private gmapsApi: GoogleMapsAPIWrapper,
         private _elementRef: ElementRef       ) {
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
                 // this.getDistanceAndDuration();
                 if (this.vc.destination !== undefined ) {
                    this.origenLat = this.vc.origin.latitude;
                    this.origenLng = this.vc.origin.longitude;
                    this.destinoLat = this.vc.destination.latitude;
                    this.destinoLng = this.vc.destination.longitude;
                 }

                 // this.estimatedTime = localStorage.getItem('duracion');
                 // this.estimatedTime = '1000 km';
               });

            });

       }

       getDistanceAndDuration() {
         this.estimatedTime = this.vc.estimatedTime;
         this.estimatedDistance = this.vc.estimatedDistance;
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
       pedirViaje() {
           // this.validarCampos();
           this.objViaje.lat_o = this.origenLat;
           this.objViaje.lng_o = this.origenLng;
           this.objViaje.lat_d = this.destinoLat;
           this.objViaje.lng_d = this.destinoLng;
           this.objViaje.tipo_pago = this.metodoPago;
           this.objViaje.fechayhora = this.fechaViaje;
           this.objViaje.token = localStorage.getItem('token');

            // console.log(this.objViaje);
        //    this.ws.postViaje( this.objViaje, '/viaje/' )
        //    .then( data => {
        //         console.log(data);
               /*
                 hacer la logica para que si no existe el mail.
                 Vaya a registrarase.
               */
               // if ( data.token ) {
               //      localStorage.setItem('token', data.token);
               //      this.router.navigateByUrl('/bienvenida');
               // }
        //    })
        //    .catch( e => {
        //        console.log(e);
        //    } );
           // console.log(this.objViaje);
       }
}