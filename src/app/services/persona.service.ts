import { Injectable } from '@angular/core';
import {ArchivoPersonaService} from './archivo-persona.service';
import { Usuario } from '../Clases/Usuario';
import { Viaje } from '../routes/viaje/viaje.component';

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

 RegistrarEncargadoRemisero(unUser:Usuario, callback: (mensaje: string) => void)
 {
   debugger;
     this.AP.ApiRegistrarEncargadoRemisero("Usuario/",unUser, mensaje => { 
     callback(mensaje);
   });
}

 
    CargarViaje(unUser:Viaje, callback: (mensaje: string) => void)
    {
      debugger;
        this.AP.CargarViaje("CargarViaje/",unUser, mensaje => { 
        callback(mensaje);
        
      });
      
    
    }
    CargarEncuesta(preg1:any,preg2:any,preg3:any,preg4:any,preg5:any,preg6:any,preg7:any,user:any, fecha:any,callback: (mensaje: string) => void)
    {
      debugger;
        this.AP.CargarEncuesta("CargarEncuesta/",preg1,preg2,preg3,preg4,preg5,preg6,preg7,user,fecha, mensaje => { 
        callback(mensaje);
        
      });
      
    
    }
    BorrarViaje(id:any, callback: (mensaje: string) => void)
    {
      debugger;
        this.AP.BorrarViaje("BorrarViaje/",id, mensaje => { 
        callback(mensaje);
        
      });
      
    
    }

    EditarViaje(id:any,rol:any, callback: (mensaje: string) => void){
      debugger;
      this.AP.EditarViaje("EditarViaje/",id, rol,mensaje => { 
      callback(mensaje);
      
    });
    
    }
    EliminarUsuario(id:any, callback: (mensaje: string) => void)
    {
      debugger;
        this.AP.EliminarUsuario("EliminarUnUsuario/",id, mensaje => { 
        callback(mensaje);
        
      });
      
    
    }


    TraeViajePorUsuario(usuario:string, callback: (data: any) => void)
    {
      debugger;
        this.AP.TraeViaje("TraeViajesPorUsuario/",usuario, data => { 
        callback(data);
        
      });
      
    
    }

    TraerViajesPorRemisero(usuario:string, callback: (data: any) => void)
    {
      debugger;
        this.AP.TraeViajePorRemisero("TraeViajesPorRemisero/",usuario, data => { 
        callback(data);
        
      });
      
    
    }


    
  obtenerRol(usuario:string, callback: (data: any) => void){
    debugger;
    this.AP.obtenerRol("obtenerRol/",usuario, data => { 
    callback(data);
    
  });
  }

  TraerTodosLosViajes (callback: (data: any) => void){
    debugger;
    this.AP.TraerTodosLosViajes("ViajesTodos/", data => { 
    callback(data);
    
  });
  }

  TraerUsuarios(callback: (data: any) => void){
    debugger;
    this.AP.TraerUsuarios("TraerUsuarios/", data => { 
    callback(data);
    
  });
  }

  TraeUsuariosClientes(callback: (data: any) => void){
    debugger;
    this.AP.TraeUsuariosClientes("TraerUsuariosCliente/", data => { 
    callback(data);
    
  });
  }
}