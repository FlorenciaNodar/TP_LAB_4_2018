import { Injectable } from '@angular/core';
import {ArchivoPersonaService} from './archivo-persona.service';
import { Usuario } from '../Clases/Usuario';
import { Viaje } from '../routes/viaje/viaje.component';

@Injectable()
export class PersonaService {

  constructor(private AP:ArchivoPersonaService) { }

  GenerarToken(username:string,password:string, callback: (token: string) => void)
  {
       
      this.AP.APIPostJWT("ingreso/",username,password, token => { 
      callback(token);
    });
  }


  Registrar(unUser:Usuario, callback: (mensaje: string) => void)
  {
        
      this.AP.APIRegistrar("Usuario/",unUser, mensaje => { 
      callback(mensaje);
    });
 }

 RegistrarEncargadoRemisero(unUser:Usuario, callback: (mensaje: string) => void)
 {
       
     this.AP.ApiRegistrarEncargadoRemisero("Usuario/",unUser, mensaje => { 
     callback(mensaje);
   });
}

 
    CargarViaje(unUser:Viaje, callback: (mensaje: string) => void)
    {
          
        this.AP.CargarViaje("CargarViaje/",unUser, mensaje => { 
        callback(mensaje);
        
      });
      
    
    }

    EditarViajePorId(unUser:Viaje, id:any, callback: (mensaje: string) => void)
    {
          
        this.AP.EditarViajePorId("EditarViajePorId/",unUser,id, mensaje => { 
        callback(mensaje);
        
      });
      
    
    }
    CargarEncuesta(preg1:any,preg2:any,preg3:any,preg4:any,preg5:any,preg6:any,preg7:any,user:any,image:any,image2:any,image3:any, fecha:any,callback: (mensaje: string) => void)
    {
          
        this.AP.CargarEncuesta("CargarEncuesta/",preg1,preg2,preg3,preg4,preg5,preg6,preg7,user,image,image2,image3,fecha, mensaje => { 
        callback(mensaje);
        
      });
      
    
    }
    BorrarViaje(id:any, callback: (mensaje: string) => void)
    {
          
        this.AP.BorrarViaje("BorrarViaje/",id, mensaje => { 
        callback(mensaje);
        
      });
      
    
    }

    EditarViaje(id:any,rol:any, callback: (mensaje: string) => void){
          
      this.AP.EditarViaje("EditarViaje/",id, rol,mensaje => { 
      callback(mensaje);
      
    });
  }

  
    EditarViajeRemisero(id:any,remisero:any, callback: (mensaje: string) => void){
          
      this.AP.EditarViajeRemisero("EditarViajeRemisero/",id, remisero,mensaje => { 
      callback(mensaje);
      
    });
    
    }

    EditarViajeCosto(id:any,cuota:any,plata:any, callback: (mensaje: string) => void){
          
      this.AP.EditarViajeCosto("EditarViajeCosto/",id, cuota,plata,mensaje => { 
      callback(mensaje);
      
    });
    
    }
    EliminarUsuario(id:any, callback: (mensaje: string) => void)
    {
          
        this.AP.EliminarUsuario("EliminarUnUsuario/",id, mensaje => { 
        callback(mensaje);
        
      });
      
    
    }


    TraeViajePorUsuario(usuario:string, callback: (data: any) => void)
    {
          
        this.AP.TraeViaje("TraeViajesPorUsuario/",usuario, data => { 
        callback(data);
        
      });
      
    
    }

    TraerEncuestas( callback: (data: any) => void)
    {
          
        this.AP.TraerEncuestas("TraerEncuestas/", data => { 
        callback(data);
        
      });
      
    
    }

    TraerViajesPorRemisero(usuario:string, callback: (data: any) => void)
    {
          
        this.AP.TraeViajePorRemisero("TraeViajesPorRemisero/",usuario, data => { 
        callback(data);
        
      });
      
    
    }

    
  TraerViajePorId(id:any, callback: (data: any) => void){
        
    this.AP.TraerViajePorId("TraerViajePorId/",id,data => { 
    callback(data);
    
  });
}


    
  obtenerRol(usuario:string, callback: (data: any) => void){
        
    this.AP.obtenerRol("obtenerRol/",usuario, data => { 
    callback(data);
    
  });
  }

  TraerTodosLosViajes (callback: (data: any) => void){
        
    this.AP.TraerTodosLosViajes("ViajesTodos/", data => { 
    callback(data);
    
  });
  }

  
  TraerEncuestaPreg4 (callback: (data: any) => void){
        
    this.AP.TraerEncuestaPreg4("TraerEncuestaPreg4/", data => { 
          
    callback(data);
    
  });
  }

  TraerUsuarios(callback: (data: any) => void){
        
    this.AP.TraerUsuarios("TraerUsuarios/", data => { 
    callback(data);
    
  });
  }

  

  TraeUsuariosClientes(callback: (data: any) => void){
        
    this.AP.TraeUsuariosClientes("TraerUsuariosCliente/", data => { 
    callback(data);
    
  });
  }
  TraeUsuariosRemiseros(callback: (data: any) => void){
        
    this.AP.TraeUsuariosRemiseros("TraerUsuariosRemisero/",data => { 
    callback(data);
    
  });
  }

  traerUsuariosEncargados(callback: (data: any) => void){
        
    this.AP.traerUsuariosEncargados("traerUsuariosEncargados/",data => { 
    callback(data);
    
  });
  }
}