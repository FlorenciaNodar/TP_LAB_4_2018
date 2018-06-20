import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { ColorsService } from '../../shared/colors/colors.service';

@Component({
    selector: 'app-graficos',
    templateUrl: './graficos.component.html',
    styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

    constructor(public colors: ColorsService) { 
    }
  
    ngOnInit() {
    }

    lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                data: [this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor()]
            }, {
                label: 'My Second dataset',
                data: [this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor()]
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                data: [this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor()]
            }, {
                data: [this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor(), this.rFactor()]
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
        return Math.round(Math.random() * 100);
    };



}
