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


// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        ViajeComponent,
        GraficosComponent
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        HttpModule,
        LayoutModule,
        RecaptchaModule.forRoot(),
        SharedModule.forRoot(),
        RoutesModule,
        Ng2ChartsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [AuthGuard,PersonaService, MiHttpService, ArchivoPersonaService, AuthenticationService,
        UserService,ReCaptchaService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: { siteKey: '6LfmD18UAAAAACVytHDmoc7WHmiTkPAAv9OOJ1dZ'} as RecaptchaSettings 
        },
 
        // provider used to create fake backend
        fakeBackendProvider],
    bootstrap: [AppComponent]
})
export class AppModule { }
