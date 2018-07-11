import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { debounce } from 'rxjs/internal/operators/debounce';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../../Clases/Usuario';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PersonaService } from '../../services/persona.service';
import swal from'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss']
  })
  export class UsuariosComponent implements OnInit {
    unUsuario:Usuario;    
    valForm: FormGroup;
    passwordForm: FormGroup;
    cambia:boolean;
    correo:string;
    password:string;
    repetpassword:string;
    nombre:string;
    result:boolean;
    encargado: boolean;
    rol:string;
    roles:string;
    administrador:boolean;
    remisero:boolean;
    cliente:boolean;
    uno: boolean;
    private unarray =[];
    p: number = 1;
    listo:boolean;
    constructor(fb: FormBuilder, private PersonaS: PersonaService,private spinner: NgxSpinnerService){
      let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
      let certainPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

      this.passwordForm = fb.group({
          'password': password,
          'confirmPassword': certainPassword
      });

      this.valForm = fb.group({
          'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
          'nombre': [null, Validators.required],
          'roles': [null, Validators.required],
          'accountagreed': [null, Validators.required],
          'passwordGroup': this.passwordForm
      });

      this.cambia=true;
      this.unUsuario= new Usuario();
    }

    ngOnInit() {
      this.listo = false;
      
    var token = localStorage.getItem('cliente');
    
    var resp = this.PersonaS.obtenerRol(token,data => {
      
    this.rol = data.rol

    if(this.rol =="Encargado" || this.rol == "Administrador"){
      this.encargado = true;   
      this.listo = true;
      
    }
    if(this.rol =="Administrador"){
      this.administrador = true;   
      this.listo = true;
      
    }
    if(this.rol =="Remisero"){
      this.remisero = true;   
      this.listo = true;
      
    }
    if(this.rol =="Cliente"){
      this.cliente = true;   
      this.listo = true;
      
    }

    this.traerUsu();

       
    if(this.listo = true){
      this.spinner.show();
      
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        this.listo = false;
        
    }, 8000);
    }
  });
}

traerUsu(){
  var respuesta=  this.PersonaS.TraerUsuarios(data => { 
    data.forEach(element => {

    this.unarray.push(element);

    });
 });
}

    resolvedCaptcha(result){
      this.result = true;
   }



   registrar(){
    if(this.nombre==null || this.password==null || this.repetpassword==null || this.correo==null ||
      this.nombre=="" || this.password=="" || this.repetpassword=="" || this.correo=="")
      {
        swal('Error!', 'Complete todos los campos', 'error');
      }
      else if(this.password != this.repetpassword)
        {
          swal('Error', 'Las claves no coinciden','error');
          
        }
        else if (this.password.length<6)
          {
            swal('Error', 'La clave debe ser de por lo menos 6 caracteres', 'error');
          }
      else
        {
                        
                  this.unUsuario.Email=this.correo;
                  this.unUsuario.Nombre=this.nombre;
                  this.unUsuario.Clave=this.password;
                  this.unUsuario.Usuario=this.correo;
                  
                  if(this.roles == "1"){
                    this.unUsuario.Rol="Administrador";
                    
                  }
                  if(this.roles == "2"){
                    this.unUsuario.Rol="Remisero";
                    
                  }
                  if(this.roles == "3"){
                    this.unUsuario.Rol="Encargado";
                    
                  }
                  
              var respuesta=  this.PersonaS.RegistrarEncargadoRemisero(this.unUsuario, mensaje => { 
                swal('OK!',mensaje,'success');
                this.cambiar();
              });
              
      }
      this.correo="";
      this.nombre="";
      this.password="";
      this.correo="";
      this.rol="";
      this.unarray=[];
      this.traerUsu();
      

   }

   cambiar()
   {
     if(this.cambia)
       {
         this.cambia=false;
       }
       else
         this.cambia=true;
   }

         
   sweetalertDemo4(user) {
          
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
        var respuesta=  this.PersonaS.EliminarUsuario(user.id , mensaje => { 
          swal(
            'Eliminado!',
            mensaje,
            'success'
          )                

        });
        this.unarray =[];
        this.traerUsu();
      }
    });
    
    }
}