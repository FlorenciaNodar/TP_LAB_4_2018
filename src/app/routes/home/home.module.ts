import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC0YfweK_TvI_PQcdueI6l78EBmY0MCTCQ'
          }),
          ChartsModule
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }
