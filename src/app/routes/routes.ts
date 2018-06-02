import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from '../_guards';
import { RegisterComponent } from './pages/register/register.component';

export const routes = [

    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],        
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },            
            { path: 'home', loadChildren: './home/home.module#HomeModule' }
        ]
    },
    { path: 'register', component: RegisterComponent },
    
    // Not found
    { path: '**', redirectTo: 'login' }

];
