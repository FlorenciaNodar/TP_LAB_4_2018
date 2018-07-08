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
    countPreg7Tal=0;
    countPreg7No=0;
    countPreg7=0;
    preg7tres: number;
    preg7uno: number;
    preg7dos: number;
    countPreg1Tal=0;
    countPreg1=0;
    countPreg1No=0;
    totalPreg1Talvez: number;
    totalPreg1No: number;
    totalPreg1Si: number;
    listSi: any;
    countNo=0;
    totalPreg4No: any;
    totalPreg4Si: any;
    total: any;
    count=0;
      //  Doughnut chart
    // -----------------------------------

    doughnutData = {
        labels: [
            'SI',
            'NO',
            'TAL VEZ'
        ],
        datasets: [{
            data: [this.totalPreg1("SI"), this.totalPreg1("NO"), this.totalPreg1("TAL VEZ")]
        }]
    };

    doughnutColors = [{
        borderColor: [
            this.colors.byName('purple'),
            this.colors.byName('pink'),
            this.colors.byName('yellow')
        ],
        backgroundColor: [
            this.colors.byName('purple'),
            this.colors.byName('pink'),
            this.colors.byName('yellow')
        ],
    }];

    doughnutOptions = {
        responsive: true
    };
    // Bar 0chart
    // -----------------------------------

    barData = {
        labels: ['SI', 'NO'],
        datasets: [
            {
                data: [this.totalSi("SI"), this.totalSi("NO")]
            }]
    };
    barColors = [
        {
            backgroundColor: this.colors.byName('info'),
            borderColor: this.colors.byName('info'),
            pointHoverBackgroundColor: this.colors.byName('info'),
            pointHoverBorderColor: this.colors.byName('info')
        }, {
            backgroundColor: this.colors.byName('primary'),
            borderColor: this.colors.byName('primary'),
            pointHoverBackgroundColor: this.colors.byName('primary'),
            pointHoverBorderColor: this.colors.byName('primary')
        }];

    barOptions = {
        scaleShowVerticalLines: true,
        responsive: true
    };

    // Pie chart
    // -----------------------------------

    pieData = {
        labels: [
            'Clientes',
            'Remiseros',
            'Encargados'
        ],
        datasets: [{
            data: [this.totalClientes(), this.totalRemiseros(), this.totalEncargados()]
        }]
    };

    pieColors = [{
        borderColor: [
            this.colors.byName('yellow'),
            this.colors.byName('purple'),
            this.colors.byName('warning'),
        ],
        backgroundColor: [
            this.colors.byName('yellow'),
            this.colors.byName('purple'),
            this.colors.byName('warning')
        ],
    }];

    pieOptions = {
        responsive: true
    };


    ///

     // Pie chart 2
    // -----------------------------------

    pieData2 = {
        labels2: [
            'Una vez al mes',
            'Una o más veces a la semana',
            'Dos o tres veces al mes'
        ],
        datasets: [{
            data: [this.totalPreg7("UNA"), this.totalPreg7("UNAMAS"), this.totalPreg7("DOS")]
        }]
    };

    pieColors2 = [{
        borderColor: [
            this.colors.byName('danger'),
            this.colors.byName('yellow'),
            this.colors.byName('purple')
        ],
        backgroundColor: [
            this.colors.byName('danger'),
            this.colors.byName('yellow'),
            this.colors.byName('purple')
        ],
    }];

    pieOptions2 = {
        responsive: true
    };
    private listViajes: any;
    private unarray =[];
    private unarray1 =[];   
     private cantidad1= 0;
    
    rol:string;
    encargado: boolean;
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

    totalEncargados(){
        this.PersonaS.traerUsuariosEncargados(data => { 
                        
            this.totalEncargados = data.length;
                });
    }
    totalSi(dato){
        this.PersonaS.TraerEncuestaPreg4(data => { 
            this.listSi = data;
            for(var i=0; i<this.listSi.length; i++){
                debugger;
                if(this.listSi[i].preg4 == "SI" && dato == "SI"){
                    this.count++;
                    this.totalPreg4Si = this.count;                    
                } if(this.listSi[i].preg4 == "NO" && dato == "NO"){
                    this.countNo++;
                    this.totalPreg4No = this.countNo;                    
                }
              
            }
               
        });
    }  
    totalPreg1(dato){
        this.PersonaS.TraerEncuestaPreg4(data => { 
            this.listSi = data;
            for(var i=0; i<this.listSi.length; i++){
                debugger;
                if(this.listSi[i].preg1 == "SI" && dato == "SI"){
                    this.countPreg1++;
                    this.totalPreg1Si = this.countPreg1;                    
                } if(this.listSi[i].preg1 == "NO" && dato == "NO"){
                    this.countPreg1No++;
                    this.totalPreg1No = this.countPreg1No;                    
                }
                if(this.listSi[i].preg1 == "TAL VEZ" && dato == "TAL VEZ"){
                    this.countPreg1Tal++;
                    this.totalPreg1Talvez = this.countPreg1Tal;                    
                }
              
            }
               
        });
    }  
    totalPreg7(dato){
        this.PersonaS.TraerEncuestaPreg4(data => { 
            this.listSi = data;
            for(var i=0; i<this.listSi.length; i++){
                debugger;
                if(this.listSi[i].preg7 == "Una vez al mes" && dato == "UNA"){
                    this.countPreg7++;
                    this.preg7uno = this.countPreg7;                    
                } if(this.listSi[i].preg7 == "Una o más veces a la semana" && dato == "UNAMAS"){
                    this.countPreg7No++;
                    this.preg7dos = this.countPreg7No;                    
                }
                if(this.listSi[i].preg7 == "Dos o tres veces al mes" && dato == "DOS"){
                    this.countPreg7Tal++;
                    this.preg7tres = this.countPreg7Tal;                    
                }
              
            }
               
        });
    }  
    
  

}
