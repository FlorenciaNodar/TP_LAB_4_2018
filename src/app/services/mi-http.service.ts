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
        
  let data = new URLSearchParams();
   data.append('usuario',unUser.Usuario);
   data.append('clave', unUser.Clave);
   data.append('nombre', unUser.Nombre);
   data.append('tipo', "Cliente");
   data.append('email', unUser.Email) ;
       
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
        
  let data = new URLSearchParams();
   data.append('usuario',unUser.Usuario);
   data.append('clave', unUser.Clave);
   data.append('nombre', unUser.Nombre);
   data.append('tipo', unUser.Rol);
   data.append('email', unUser.Email) ;
       
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
       
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  EditarViajePorId(url:string,unUser:Viaje, id:any,callback: (r: Response) => void)
  {
        
  let data = new URLSearchParams();
   data.append('id',id);
   data.append('usuario',unUser.token);
   data.append('pago', unUser.tipo_pago);
   data.append('dia', unUser.fechayhora);
   data.append('origenlat', unUser.lat_o);
   data.append('origenlong', unUser.lng_o) ;
   data.append('destinolat', unUser.lat_d) ;
   data.append('destinolong', unUser.lng_d) ;
   data.append('prestaciones', unUser.prestaciones) ;
   data.append('estado', unUser.estado) ;
       
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }
 
  CargarEncuesta(url:string,preg1:any,preg2:any,preg3:any,preg4:any,preg5:any,preg6:any,preg7:any,user:any,image:any,image2:any,image3:any,fecha:any, callback: (r: Response) => void)
  {
        
   
  let data = new URLSearchParams();
   data.append('usuario', user );
   data.append('fecha', fecha);
   data.append('preg1', preg1);
   data.append('preg2', preg2);
   data.append('preg3', preg3) ;
   data.append('preg4', preg4) ;
   data.append('preg5', preg5) ;
   data.append('preg6', preg6) ;
   data.append('preg7', preg7) ;
   data.append('img', image) ;
   data.append('img2', image2) ;
   data.append('img3', image3) ;
       
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al cargar','error' );          
        });
  }

  BorrarViaje(url:string,id:any, callback: (r: Response) => void)
  {
        
  let data = new URLSearchParams();
   data.append('id',id);
  
       
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
   if(rol == "Cliente")
   {
    data.append('estado',"Cancelado");    
   }
       
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al modificar','error' );          
        });
  }

  EditarViajeRemisero(url:string,id:any,remisero:any, callback: (r: Response) => void)
  {
        
  let data = new URLSearchParams();
   data.append('id',id);
 
    data.append('remisero',remisero);    
   
       
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al modificar','error' );          
        });
  }

  EditarViajeCosto  (url:string,id:any,cuota:any,plata:any, callback: (r: Response) => void)
  {
        
  let data = new URLSearchParams();
   data.append('id',id);
 
    data.append('costo',plata);    
    data.append('cuotas',cuota);    
   
       
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
        
  let data = new URLSearchParams();
   data.append('id',id);
  
       
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
        
  let data = new URLSearchParams();
   data.append('usuario',usuario);
       
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  TraerEncuestas(url:string, callback: (r: Response) => void)
  {
        
  let data = new URLSearchParams();
       
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }


  TraerEncuestaPreg4(url:string, callback: (r: Response) => void)
  {
        
  let data = new URLSearchParams();
       
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
        
  let data = new URLSearchParams();
   data.append('remisero',usuario);
       
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  TraerViajePorId(url:string,id:any, callback: (r: Response) => void)
  {
        
  let data = new URLSearchParams();
   data.append('id',id);
       
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
        
  let data = new URLSearchParams();
   data.append('usuario',usuario);
       
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
        
  let data = new URLSearchParams();
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  TraeUsuariosRemiseros(url:string,callback: (r: Response) => void)
  {
        
  let data = new URLSearchParams();
       this.http
      .post(url,data)
      .map(res => res)  
      .subscribe(callback, 
        error => {
          swal('Advertencia!', 'Ocurrio un error al registrarse','error' );          
        });
  }

  traerUsuariosEncargados(url:string,callback: (r: Response) => void)
  {
        
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