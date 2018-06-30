import { Injectable,Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } 
from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Usuario } from '../Clases/Usuario';
import swal from'sweetalert2';
import { Viaje } from '../routes/viaje/viaje.component';
@Injectable()

export class MiHttpService {
  headers: Headers;
  options: RequestOptions;
  obs:Observable<any>;
  constructor(private http:Http) { }


  postjwt(url:string,username:string,password:string, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
   data.append('usuario',username);
   data.append('clave', password);
       this.http
      .post(url,data)
      .map(res => res)
      .subscribe(callback,
        error => {
         swal('Advertencia!', 'Correo y/o Clave incorrectos!','error' );
         
         //alert("Usuario y/o Clave no son validos");
        });
  }
  dameunapromesa(url:string)
  {
    return this.http
    .get(url)
    .toPromise()
    .then(this.extraerDatos)
    .catch(this.manejadorDeError);
  }

  extraerDatos(respuesta:Response)
  {
        console.log(respuesta);
        return respuesta.json()||{};
  }

  manejadorDeError(error:Response|any)
  { 
    console.log(error);
        return error;
  }

  PostRegistrar(url:string,unUser:Usuario, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
   data.append('usuario',unUser.Usuario);
   data.append('clave', unUser.Clave);
   data.append('nombre', unUser.Nombre);
   data.append('tipo', "Cliente");
   data.append('email', unUser.Email) ;
   debugger;
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  PostRegistrarEncargadoRemisero(url:string,unUser:Usuario, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
   data.append('usuario',unUser.Usuario);
   data.append('clave', unUser.Clave);
   data.append('nombre', unUser.Nombre);
   data.append('tipo', unUser.Rol);
   data.append('email', unUser.Email) ;
   debugger;
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }
  CargarViaje(url:string,unUser:Viaje, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
   data.append('usuario',unUser.token);
   data.append('pago', unUser.tipo_pago);
   data.append('dia', unUser.fechayhora);
   data.append('origenlat', unUser.lat_o);
   data.append('origenlong', unUser.lng_o) ;
   data.append('destinolat', unUser.lat_d) ;
   data.append('destinolong', unUser.lng_d) ;
   data.append('prestaciones', unUser.prestaciones) ;
   data.append('estado', unUser.estado) ;
   debugger;
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  BorrarViaje(url:string,id:any, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
   data.append('id',id);
  
   debugger;
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al borrar','error' );          
        });
  }

  EditarViaje(url:string,id:any,rol:any, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
   data.append('id',id);
   if(rol == "Remisero")
   {
    data.append('estado',"Realizado");    
   }
   if(rol == "Administrador" || rol == "Encargado")
   {
    data.append('estado',"Aprobado");    
   }
   debugger;
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al modificar','error' );          
        });
  }
  BorrarUsuario(url:string,id:any, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
   data.append('id',id);
  
   debugger;
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  TraerViajesPorUsuarios(url:string,usuario:string, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
   data.append('usuario',usuario);
   debugger;
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  TraerViajesPorRemisero(url:string,usuario:string, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
   data.append('remisero',usuario);
   debugger;
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  obtenerRol(url:string,usuario:string, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
   data.append('usuario',usuario);
   debugger;
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  TraerTodosLosViajes(url:string, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }
  TraerUsuarios(url:string, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  TraeUsuariosClientes(url:string, callback: (r: Response) => void)
  {
    debugger;
  let data = new URLSearchParams();
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }
}