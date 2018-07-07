import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from '../_guards';
import { RegisterComponent } from './pages/register/register.component';
import { ViajeComponent } from './viaje/viaje.component';
import { GraficosComponent } from './graficos/graficos.component';
import { MisViajesComponent } from './misViajes/misviajes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
export const routes = [

    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],        
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },            
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'viaje', component: ViajeComponent },            
            { path: 'viaje/editar/:id', component: ViajeComponent },            
            { path: 'graficos', component: GraficosComponent },            
            { path: 'misViajes', component: MisViajesComponent },
            { path: 'usuarios', component: UsuariosComponent },

                ]
    },
    { path: 'register', component: RegisterComponent },
    
    // Not found
    { path: '**', redirectTo: 'login' }

];
