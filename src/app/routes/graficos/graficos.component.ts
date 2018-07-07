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
  var respuesta=  this.PersonaS.TraerTodosLosViajes(data => { 
    data.forEach(element => {

    this.unarray1.push(element);
    this.listViajes = this.unarray;
    this.unarray1.forEach(element => {
      if(element.costo == null){
          element.costo = "A confirmar por el remisero";
      }
    });
    this.unarray.push(element);
    debugger;
    //this.cantidad1 = this.unarray.length;
});
 });    }
  
    lineData = {
        labels: ['Remiseros', 'Clientes', 'Encargados'],
        datasets: [
            {
                label: 'My First dataset',
                data: []
            }, {
                label: 'My Second dataset',
                data: []
            }, {
                label: 'My Thrist dataset',
                data: []
            }]
    };

    lineColors = [
        {
            backgroundColor: 'rgba(114,102,186,0.2)',
            borderColor: 'rgba(114,102,186,1)',
            pointBackgroundColor: 'rgba(114,102,186,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(114,102,186,1)'
        }, {
            backgroundColor: 'rgba(35,183,229,0.2)',
            borderColor: 'rgba(35,183,229,1)',
            pointBackgroundColor: 'rgba(35,183,229,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(35,183,229,1)'
        }, {
            backgroundColor: 'rgba(35,183,229,0.2)',
            borderColor: 'rgba(35,183,229,1)',
            pointBackgroundColor: 'rgba(35,183,229,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(35,183,229,1)'
        }];

    lineOptions = {
        animation: false,
        responsive: true
    };

    // Bar chart
    // -----------------------------------

    barData = {
        labels: ['Remiseros', 'Encargados'],
        datasets: [
            {
                data: []
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
        scaleShowVerticalLines: false,
        responsive: true
    };

    rFactor() {
        
    
        //var cantidad = this.traerClientes();
        // return cantidad;         
         
    };
    rFactor2() {
        // var token = localStorage.getItem('cliente');
        
        // var respuesta=  this.PersonaS.TraeViajePorUsuario(token , data => { 
        //     data.forEach(element => {
  
        //     this.unarray1.push(element);
        //     this.unarray1.forEach(element => {
        //       if(element.costo == null){
        //           element.costo = "A confirmar por el remisero";
        //       }
        //     });
            
        //     });
        //  });
         return 2;
         
    };
    rFactor3() {
        // var token = localStorage.getItem('cliente');
        
        // var respuesta=  this.PersonaS.TraeViajePorUsuario(token , data => { 
        //     data.forEach(element => {
  
        //     this.unarray1.push(element);
        //     this.unarray1.forEach(element => {
        //       if(element.costo == null){
        //           element.costo = "A confirmar por el remisero";
        //       }
        //     });
            
        //     });
        //  });
         return 20;
         
    };

    donutData = [{
        'color': '#39C558',
        'data': 60,
        'label': 'Coffee'
    },
        {
            'color': '#00b4ff',
            'data': 90,
            'label': 'CSS'
        },
        {
            'color': '#FFBE41',
            'data': 50,
            'label': 'LESS'
        },
        {
            'color': '#ff3e43',
            'data': 80,
            'label': 'Jade'
        },
        {
            'color': '#937fc7',
            'data': 116,
            'label': 'AngularJS'
        }
    ];
    donutOptions = {
        series: {
            pie: {
                show: true,
                innerRadius: 0.5 // This makes the donut shape
            }
        }
    };

}
