import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { debounce } from 'rxjs/internal/operators/debounce';
import { MisViajesComponent } from '../misViajes/misviajes.component';



@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
  })
  export class ModalComponent {
    @ViewChild(MisViajesComponent) vc: MisViajesComponent;
    
    private unarray1 =[];
    

    constructor(){

    }

    eliminar(){
    }
  }