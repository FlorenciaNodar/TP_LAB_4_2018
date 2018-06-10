import { Injectable } from '@angular/core';
import {ArchivoPersonaService} from './archivo-persona.service';
import { Usuario } from '../Clases/Usuario';
@Injectable()
export class PersonaService {

  constructor(private AP:ArchivoPersonaService) { }

  GenerarToken(username:string,password:string, callback: (token: string) => void)
  {
   debugger;
      this.AP.APIPostJWT("ingreso/",username,password, token => { 
      callback(token);
    });
  }

  Registrar(unUser:Usuario, callback: (mensaje: string) => void)
  {
    debugger;
      this.AP.APIRegistrar("Usuario/",unUser, mensaje => { 
      callback(mensaje);
    });
   
  }
}