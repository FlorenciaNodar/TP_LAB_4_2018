import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
//import { AuthGuard } from './guards/auth-guard/auth-guard';
import {PersonaService} from './services/persona.service';
import {MiHttpService} from './services/mi-http.service';
import {ArchivoPersonaService} from './services/archivo-persona.service';
import { AuthGuard } from './_guards';
import { JwtInterceptor, fakeBackendProvider } from './_helpers';
import { AuthenticationService, UserService } from './_services';
import { ReCaptchaService } from './services/captcha-service';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ViajeComponent } from './routes/viaje/viaje.component';
import { GraficosComponent } from './routes/graficos/graficos.component';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { DirectionsMapDirective } from './google-map.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MisViajesComponent } from './routes/misViajes/misviajes.component';
import { UsuariosComponent } from './routes/usuarios/usuarios.component';


// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    // schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
    declarations: [
        AppComponent,
        ViajeComponent,
        GraficosComponent,
        DirectionsMapDirective,
        MisViajesComponent,
        UsuariosComponent
        
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        HttpModule,
        FormsModule,
        LayoutModule,
        ReactiveFormsModule,
        RecaptchaModule.forRoot(),
        SharedModule.forRoot(),
        RoutesModule,
        BrowserModule,
        Ng2ChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDyFfo561pm54EAGnMs72i7LyudqeHicXI',
            libraries: ['places']
            
          }),
          
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [AuthGuard,PersonaService, MiHttpService,AuthenticationService, ArchivoPersonaService,
        ReCaptchaService,
       
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: '6LfmD18UAAAAACVytHDmoc7WHmiTkPAAv9OOJ1dZ'} as RecaptchaSettings 
        }
 
        // provider used to create fake backend
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
