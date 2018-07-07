import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';
import { Usuario } from '../Clases/Usuario';
import { Viaje } from '../routes/viaje/viaje.component';
var path = "http://localhost:8080/index.php/";
@Injectable()
export class ArchivoPersonaService {

  constructor(public mihttp:MiHttpService) { }

  
  public APIGet(Ruta:string) 
  {
   return this.mihttp.dameunapromesa(path + Ruta )
    .then(datos =>datos)
    .catch(e=>e);
  }

  public APIPostJWT(Ruta:string,username:string,password:string, callback: (token: string) => void) 
  { 
    debugger;
   var rta =  this.mihttp.postjwt(path + Ruta ,username,password, data => { 
      var token = JSON.parse(data.text()).token;
      callback(token);
    }); 
  }

  public APIRegistrar(Ruta:string,unUser:Usuario, callback: (mensaje: string) => void) 
  { 
    debugger;
   var rta =  this.mihttp.PostRegistrar(path + Ruta ,unUser, data => { 
      var mensaje = JSON.parse(data.text()).mensaje;
      callback(mensaje);
    }); 
  }
  public ApiRegistrarEncargadoRemisero(Ruta:string,unUser:Usuario, callback: (mensaje: string) => void) 
  { 
    debugger;
   var rta =  this.mihttp.PostRegistrarEncargadoRemisero(path + Ruta ,unUser, data => { 
      var mensaje = JSON.parse(data.text()).mensaje;
      callback(mensaje);
    }); 
  }
  

  public CargarViaje(Ruta:string,unUser:Viaje, callback: (mensaje: string) => void) 
  { 
    debugger;
   var rta =  this.mihttp.CargarViaje(path + Ruta ,unUser, data => { 
      var mensaje = JSON.parse(data.text()).mensaje;
      callback(mensaje);
    }); 
  }
  CargarEncuesta(Ruta:string,preg1:any,preg2:any,preg3:any,preg4:any,preg5:any,preg6:any,preg7:any,user:any,fecha:any, callback: (mensaje: string) => void) 
  { 
    debugger;
   var rta =  this.mihttp.CargarEncuesta(path + Ruta ,preg1,preg2,preg3,preg4,preg5,preg6,preg7,user,fecha, data => { 
      var mensaje = JSON.parse(data.text()).mensaje;
      callback(mensaje);
    }); 
  }
  BorrarViaje(Ruta:string,id:any, callback: (mensaje: string) => void) 
  { 
    debugger;
   var rta =  this.mihttp.BorrarViaje(path + Ruta ,id, data => { 
      var mensaje = JSON.parse(data.text()).mensaje;
      callback(mensaje);
    }); 
  }

  EditarViaje(Ruta:string,id:any,rol:any, callback: (mensaje: string) => void) 
  { 
    debugger;
   var rta =  this.mihttp.EditarViaje(path + Ruta ,id, rol,data => { 
      var mensaje = JSON.parse(data.text()).mensaje;
      callback(mensaje);
    }); 
  }

  EditarViajeRemisero(Ruta:string,id:any,remisero:any, callback: (mensaje: string) => void) 
  { 
    debugger;
   var rta =  this.mihttp.EditarViajeRemisero(path + Ruta ,id, remisero,data => { 
      var mensaje = JSON.parse(data.text()).mensaje;
      callback(mensaje);
    }); 
  }

  EditarViajeCosto(Ruta:string,id:any,plata:any, callback: (mensaje: string) => void) 
  { 
    debugger;
   var rta =  this.mihttp.EditarViajeCosto(path + Ruta ,id, plata,data => { 
      var mensaje = JSON.parse(data.text()).mensaje;
      callback(mensaje);
    }); 
  }



  EliminarUsuario(Ruta:string,id:any, callback: (mensaje: string) => void) 
  { 
    debugger;
   var rta =  this.mihttp.BorrarUsuario(path + Ruta ,id, data => { 
      var mensaje = JSON.parse(data.text()).mensaje;
      callback(mensaje);
    }); 
  }

  public TraeViaje(Ruta:string,usuario:string, callback: (data: any) => void) 
  { 
    debugger;
   var rta =  this.mihttp.TraerViajesPorUsuarios(path + Ruta ,usuario, data => { 
    var datos = data.json();
    callback(datos);
    }); 
  }

  TraeViajePorRemisero(Ruta:string,usuario:string, callback: (data: any) => void) 
  { 
    debugger;
   var rta =  this.mihttp.TraerViajesPorRemisero(path + Ruta ,usuario, data => { 
    var datos = data.json();
    callback(datos);
    }); 
  }

  public obtenerRol(Ruta:string,usuario:string, callback: (data: any) => void){
    debugger;
    var rta =  this.mihttp.obtenerRol(path + Ruta ,usuario, data => { 
     var datos =JSON.parse(data.text());
     callback(datos);
     }); 
  }
  public TraerTodosLosViajes(Ruta:string, callback: (data: any) => void){
    debugger;
    var rta =  this.mihttp.TraerTodosLosViajes(path + Ruta, data => { 
     var datos =JSON.parse(data.text());
     callback(datos);
     }); 
  }

  public TraeUsuariosClientes(Ruta:string, callback: (data: any) => void){
    debugger;
    var rta =  this.mihttp.TraeUsuariosClientes(path + Ruta, data => { 
     var datos =data.json();
     callback(datos);
     }); 
  }


  public TraeUsuariosRemiseros(Ruta:string, callback: (data: any) => void){
    debugger;
    var rta =  this.mihttp.TraeUsuariosRemiseros(path + Ruta, data => { 
     var datos =data.json();
     callback(datos);
     }); 
  }
  public TraerUsuarios(Ruta:string, callback: (data: any) => void){
    debugger;
    var rta =  this.mihttp.TraerUsuarios(path + Ruta, data => { 
     var datos =JSON.parse(data.text());
     callback(datos);
     }); 
  }

  
}
