import { Injectable } from '@angular/core';
import {MiHttpService} from './mi-http.service';
import { Usuario } from '../Clases/Usuario';
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
}
