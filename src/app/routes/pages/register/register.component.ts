import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Usuario } from '../../../clases/Usuario';
import { PersonaService } from  '../../../services/persona.service';
import swal from'sweetalert2';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    unUsuario:Usuario;    
    valForm: FormGroup;
    passwordForm: FormGroup;
    cambia:boolean;
    correo:string;
    password:string;
    repetpassword:string;
    nombre:string;
    constructor(private PersonaS:PersonaService,public settings: SettingsService, fb: FormBuilder) {

        let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
        let certainPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

        this.passwordForm = fb.group({
            'password': password,
            'confirmPassword': certainPassword
        });

        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'nombre': [null, Validators.required],
            'accountagreed': [null, Validators.required],
            'passwordGroup': this.passwordForm
        });

        this.cambia=true;
        this.unUsuario= new Usuario();
        
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

    registrar()
    {
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
                    debugger;
                    this.unUsuario.Email=this.correo;
                    this.unUsuario.Nombre=this.nombre;
                    this.unUsuario.Clave=this.password;
                    this.unUsuario.Usuario=this.correo;
                var respuesta=  this.PersonaS.Registrar(this.unUsuario, mensaje => { 
                  swal('OK!',mensaje,'success');
                  this.cambiar();
                });
                
        }
      }
    // submitForm($ev, value: any) {
    //     $ev.preventDefault();
    //     for (let c in this.valForm.controls) {
    //         this.valForm.controls[c].markAsTouched();
    //     }
    //     for (let c in this.passwordForm.controls) {
    //         this.passwordForm.controls[c].markAsTouched();
    //     }

    //     if (this.valForm.valid) {
    //         console.log('Valid!');
    //         console.log(value);
    //     }
    // }

    ngOnInit() {
    }

}
