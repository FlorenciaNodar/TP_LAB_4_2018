import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {PersonaService} from '../../../services/persona.service';
import { AuthenticationService } from '../../../_services';
import { first } from 'rxjs/operators';
import { debug } from 'util';
import { ReCaptchaService } from '../../../../app/services/captcha-service';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ElementRef ,  EventEmitter, NgZone} from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    // valForm: FormGroup;
    username:string;
    // tipoUsuario:string;
    // cambia:boolean;
    password:string;

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
 

   
    constructor(public settings: SettingsService, private _zone: NgZone,
        private _captchaService: ReCaptchaService,private route: ActivatedRoute, private fb: FormBuilder, public router: Router,private authenticationService: AuthenticationService, public PersonaS: PersonaService) {

        // this.valForm = fb.group({
        //     'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
        //     'password': [null, Validators.required]
        // });

    }

    ngOnInit() {
       
        this.loginForm = this.fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });
 
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get f() { return this.loginForm.controls; }

    selectAdmin(){
        this.username = "admin@admin.com";
        this.password = "123456";
    }

    selectEnc(){
        this.username = "encargado@encargado.com";
        this.password = "123456";
    }

    selectClient(){
        this.username = "cliente@cliente.com";
        this.password = "123456";
    }

    selectRemisero(){
        this.username = "remisero@remisero.com";
        this.password = "123456";
    }

    onSubmit() {
        this.submitted = true;
 
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
 
        if (this.loginForm.valid) {
                    var respuesta=  this.PersonaS.GenerarToken(this.f.username.value,this.f.password.value, token => { 
                        if(token!=undefined)
                          {
                              debugger;
                            sessionStorage.clear();
                            sessionStorage.setItem("token",token);
                            sessionStorage.setItem("cliente",this.f.username.value);
                            localStorage.setItem("token",token);
                            localStorage.setItem("cliente",this.f.username.value);
                            this.router.navigate([this.returnUrl]);
                          }
                      });
                }
    }



}
