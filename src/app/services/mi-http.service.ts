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

}