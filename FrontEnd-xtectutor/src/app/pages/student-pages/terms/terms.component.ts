import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'terms-cmp',
    templateUrl: 'terms.component.html'
})

export class TermsComponent implements OnInit{

    constructor(private http:HttpClient, private modal:NgbModal, private CS:CommunicationService, private router: Router){}

    ngOnInit(){
        if(globalThis.flag == 1){
            globalThis.flag = 0;
            this.router.navigateByUrl('/user');
        }
    }




}
