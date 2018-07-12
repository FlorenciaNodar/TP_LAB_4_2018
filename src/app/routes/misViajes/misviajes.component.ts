
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullTextSearch',
  pure: false
})
export class FullTextSearchPipe implements PipeTransform {

  constructor() { }

  transform(value: any, query: string, field: string): any {
      return query ? value.reduce((prev, next) => {
        if (next[field].includes(query)) { prev.push(next); }
        return prev;
      }, []) : value;
    }
}
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
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
import { NgxSpinnerService } from 'ngx-spinner';
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
  unarray4=[];
  selectedFile3: any;
  selectedFile2: any;
  selectedFile: any;
  public idViajeSeleccionado: any;
  p: number = 1;
  
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
  dragging: boolean = false;
  loaded: boolean = false;
  imageLoaded: boolean = false;
  imageSrc: string = '';
  imageSrc2: string = '';
  imageSrc3: string = '';
  inputAfectado: string = '';

  fotoSubida;
  fotoSubida2;
  fotoSubida3;


  
  activeColor: string = 'green';
  baseColor: string = '#ccc';
  overlayColor: string = 'rgba(255,255,255,0.5)';


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

     isChecked:boolean;
     listo:boolean;
     testModel:string;
     
      fotoTraida: SafeUrl;
     
     token = localStorage.getItem('cliente');
 
       constructor( private _sanitizer: DomSanitizer,
       private PersonaS: PersonaService,private spinner: NgxSpinnerService,       
      private router:Router ) {
        
       }

       ngOnInit() {
        this.listo = false;

       
       
        var respuesta1=  this.PersonaS.TraerEncuestas(data => { 
          data.forEach(element => {
                  
                this.unarray4.push(element);
            
                for(var i=0; i<this.unarray4.length; i++){
                  this.fotoTraida = this._sanitizer.bypassSecurityTrustUrl(this.unarray4[i].img);
                }
                });
          
        });

        var respuesta=  this.PersonaS.TraeUsuariosRemiseros(mensaje => { 
          mensaje.forEach(element => {
            
                      this.remises.push(element);
                      });    
    
        });
         this.seAbrioRemisero= false;
         this.seAbrioCosto = false;
         this.seAbrio = false;
        this.objViaje = new Viaje();
        // set google maps defaults


              
        
        var resp = this.PersonaS.obtenerRol(this.token,data => {
          
        this.rol = data.rol

        if(this.rol == "Cliente"){
          this.cliente = true;  
          this.listo = true; 
          
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

          });
       });
        }
        if(this.rol == "Encargado" ){
          this.encargado = true;
          this.listo = true; 
          
            
            
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
            });
         });
        }
        if(this.rol == "Administrador" ){
          this.administrador = true;
          this.listo = true; 
          
            
            
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
        if(this.rol == "Remisero"){
          this.remisero = true;
          this.listo = true; 
          
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
  
            });
         });
        }
 
        
        });

     
        if(this.listo = true){
          this.spinner.show();
          
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();
            this.listo = false;
            
        }, 5000);
        }
      
      }

      
  
      private validarCampos() {

      }
      
      public get placeholder() {
        return this.fotoTraida;
      }
    sweetalertDemo4(viaje) {
            
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
            this.unarray=[];
                        this.ngOnInit();            


          });
          
        }
      });
      
      }

      sweetalertDemo5(viaje) {
        debugger;
        if(viaje.costo == null && this.rol == "Remisero" || viaje.costo == "" && this.rol == "Remisero" || viaje.costo == "A confirmar por el remisero"&& this.rol == "Remisero"){
          swal('ADVERTENCIA!',"Para modificar estado debe completar el pago",'error');          
        }else{
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
                this.unarray=[];
                
                this.ngOnInit();            
                
              });
              
            }
          });
        }
       
        
        }

        
      sweetalertDemo6(viaje) {
              
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
              this.unarray=[];
              
              this.ngOnInit();            

            });
            
            
          }
        });
        
        }

      download(){
              
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
      public captureScreen()  
      {  
        var data = document.getElementById('contentToConvert');  
        html2canvas(data).then(canvas => {  
          // Few necessary setting options  
          var imgWidth = 208;   
          var pageHeight = 295;    
          var imgHeight = canvas.height * imgWidth / canvas.width;  
          var heightLeft = imgHeight;  
      
          const contentDataURL = canvas.toDataURL('image/png')  
          let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
          var position = 0;  
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
          pdf.save('Listado de Viajes.pdf'); // Generated PDF   
        });  
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
      onFileSelected(event){
              
        this.selectedFile = event.target.files[0].name;
      }
      onFileSelected2(event){
        this.selectedFile2 = event.target.files[0];
      }
      onFileSelected3(event){
        this.selectedFile3 = event.target.files[0];
      }
    
      cargarEncuesta(radio1,radio2,radio3, check1, check2, check3,check4){

              
        var hoy = new Date();
        var dia = hoy.getDate(); 
        var mes = hoy.getMonth() + 1;
        var anio= hoy.getFullYear();
        var fecha_actual = String(dia+"/"+mes +"/"+anio);
              
        
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
        
        if(preg1 == "" || preg1 == undefined || preg2 == "" || preg2 == undefined  ||this.imageSrc3 == "" || this.imageSrc3 == undefined  ||this.imageSrc2 == "" || this.imageSrc2 == undefined ||this.imageSrc == "" || this.imageSrc == undefined ||  preg3 == "" || preg3 == undefined|| preg4 == "" || preg4 == undefined|| preg5 == "" || preg5 == undefined|| preg6 == "" || preg6== undefined|| this.preg7 == "" || this.preg7 == undefined){
          swal('ADVERTENCIA!',"Debe completar todos los campos",'error');
          
        }else{
       var respuesta=  this.PersonaS.CargarEncuesta(preg1,preg2,preg3,preg4,preg5,preg6,this.preg7,this.token,this.imageSrc,this.imageSrc2,this.imageSrc3, fecha_actual,mensaje => { 
          swal('OK!',mensaje,'success');
          
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

      this.router.navigate(["/viaje/editar",viaje.id]);
            
      }
   

  modificarRemisero(viaje)
  {
          
    this.idViajeSeleccionado = viaje.id;

    this.seAbrioRemisero = true;
   
  
  }

  cancelarRemisero(){
    this.seAbrioRemisero = false;
 
    this.unarray = [];
    this.ngOnInit();
    
    
  }
  modificarRemis(remisero){
          
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
    this.ngOnInit();
    
    
   
  }

  AgregarPago(item){
    this.idViajeSeleccionado = item.id;
    
    this.seAbrioCosto = true;
  }

  modificarCosto(cuota,plata)
  {
    var respuesta=  this.PersonaS.EditarViajeCosto(this.idViajeSeleccionado,cuota, plata, data => { 
      swal(
        'Modificado!',
        data,
        'success'
      )         
      });

      this.seAbrioCosto = false;
      this.unarray = [];
    this.ngOnInit();
  }

  cancelarCosto(){
    this.seAbrioCosto = false;
    
       this.unarray = [];
       this.ngOnInit();
       
  }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;
    this.inputAfectado = e.srcElement.id;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }        

  _handleReaderLoaded(e) {
    var reader = e.target;

    switch (parseInt(this.inputAfectado.substring(this.inputAfectado.length - 1, this.inputAfectado.length))) {
      case 1:
        this.fotoSubida = (<HTMLInputElement>document.getElementById('file1')).files[0];
        if (!this.ValidarFoto(this.fotoSubida)) {
          alert("Cambie la imagen 1, solo se permiten imagenes de tamanio inferior a 1 MB");
          this.fotoSubida = undefined;
          return;
        } else {
          this.imageSrc = reader.result;
        }
        break;
      case 2:
        this.fotoSubida2 = (<HTMLInputElement>document.getElementById('file2')).files[0];
        if (!this.ValidarFoto(this.fotoSubida2)) {
          alert("Cambie la imagen 2, solo se permiten imagenes de tamanio inferior a 1 MB");
          this.fotoSubida2 = undefined;
          return;
        } else {
          this.imageSrc2 = reader.result;
        }

        break;
      case 3:
        this.fotoSubida3 = (<HTMLInputElement>document.getElementById('file3')).files[0];
              
        if (!this.ValidarFoto(this.fotoSubida3)) {
          alert("Cambie la imagen 3, solo se permiten imagenes de tamanio inferior a 1 MB");
          this.fotoSubida3 = undefined;
          return;
        } else {
          this.imageSrc3 = reader.result;
                
        }

        break;
    }
    this.loaded = true;
  }

  ValidarFoto(foto) {
    if (foto != undefined) {
      if (foto.size > (1024 * 1024)) {
        return false;
      }
    }
    return true;
  }

  }
      
    

       
