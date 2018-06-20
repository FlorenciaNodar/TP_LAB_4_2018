import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';
const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
          ChartsModule
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }
