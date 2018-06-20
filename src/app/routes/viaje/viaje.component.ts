import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
@Component({
    selector: 'app-viaje',
    templateUrl: './viaje.component.html',
    styleUrls: ['./viaje.component.scss']
})
export class ViajeComponent implements OnInit {

    lat: number = 51.678418;
    lng: number = 7.809007;
    constructor(public http: HttpClient) { 
        this.getChartData('assets/server/chart/area.json').subscribe(data => this.areaData = data);
    }
    getChartData(url): Observable<any> {
        return this.http.get(url);
    }
    ngOnInit() {
    }

    areaData: any;
    areaOptions = {
        series: {
            lines: {
                show: true,
                fill: 0.8
            },
            points: {
                show: true,
                radius: 4
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,
        tooltipOpts: {
            content: function(label, x, y) { return x + ' : ' + y; }
        },
        xaxis: {
            tickColor: '#fcfcfc',
            mode: 'categories'
        },
        yaxis: {
            min: 0,
            tickColor: '#eee',
            // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
            tickFormatter: function(v) {
                return v + ' visitors';
            }
        },
        shadowSize: 0
    };

    
    ready($event) {
        // $event == { plot: PlotObject }
        console.log('Ready!');
    }

    

}
