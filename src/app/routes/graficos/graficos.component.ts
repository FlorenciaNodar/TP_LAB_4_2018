import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { ColorsService } from '../../shared/colors/colors.service';
import { PersonaService } from '../../services/persona.service';
@Component({
    selector: 'app-graficos',
    templateUrl: './graficos.component.html',
    styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {
    total: any;
   

    // Pie chart
    // -----------------------------------

    pieData = {
        labels: [
            'Clientes',
            'Remiseros'
        ],
        datasets: [{
            data: [this.totalClientes(), this.totalRemiseros()]
        }]
    };

    pieColors = [{
        borderColor: [
            this.colors.byName('yellow'),
            this.colors.byName('purple')
        ],
        backgroundColor: [
            this.colors.byName('yellow'),
            this.colors.byName('purple')
        ],
    }];

    pieOptions = {
        responsive: true
    };
    private listViajes: any;
    private unarray =[];
    private unarray1 =[];   
     private cantidad1= 0;
    
    rol:string;
    encargado: boolean;
    count = 0;
    constructor(public colors: ColorsService, private PersonaS: PersonaService) { 
  
    }
  
    ngOnInit() {  

    var token = localStorage.getItem('cliente');

    var resp = this.PersonaS.obtenerRol(token,data => {

    this.rol = data.rol

    if( this.rol =="Encargado" || this.rol == "Administrador"){
    this.encargado = true;   

    }
    });
    }

    totalClientes(){
            this.PersonaS.TraeUsuariosClientes(data => { 
        
                    this.total = data.length;
            });
    }

    totalRemiseros(){
    this.PersonaS.TraeUsuariosRemiseros(data => { 
        
                    this.totalRemiseros = data.length;
            });
    }
    
  

}
