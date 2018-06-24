import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { debounce } from 'rxjs/internal/operators/debounce';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../../Clases/Usuario';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PersonaService } from '../../services/persona.service';


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
    constructor(fb: FormBuilder, private PersonaS: PersonaService){
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

    ngOnInit() {
    var token = localStorage.getItem('cliente');
    
    var resp = this.PersonaS.obtenerRol(token,data => {
      
    this.rol = data.rol

    if(this.rol =="Encargado"){
      this.encargado = true;   
      
    }
  });
}

    resolvedCaptcha(result){
      this.result = true;
   }
  }