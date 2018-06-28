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
    unarray: any;
    listViajes: any;
    private unarray1 =[];
    
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
  
    lineData = {
        labels: ['Remiseros', 'Clientes', 'Encargados'],
        datasets: [
            {
                label: 'My First dataset',
                data: [this.rFactor()]
            }, {
                label: 'My Second dataset',
                data: [this.rFactor2()]
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
        }];

    lineOptions = {
        animation: false,
        responsive: true
    };


    // Bar chart
    // -----------------------------------

    barData = {
        labels: ['Remiseros', 'Encargados', 'Clientes'],
        datasets: [
            {
                data: [this.rFactor(), this.rFactor2(), this.rFactor3()]
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
        
        var respuesta=  this.PersonaS.TraeUsuariosClientes(data => { 
            data.forEach(element => {
               this.unarray1.push(element);
         });
        });
         debugger;
         console.log(this.unarray1);
         return this.unarray1.length.toString();
         
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
         return 20;
         
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

}
