import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    login: any;
    
    constructor(public userblockService: UserblockService) {

        this.user = {
            picture: 'assets/img/user/01.jpg'
        };
        this.login = localStorage.getItem('cliente');
        
    }

    ngOnInit() {
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
