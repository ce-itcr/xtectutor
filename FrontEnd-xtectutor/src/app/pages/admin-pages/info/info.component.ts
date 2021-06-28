import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'info-cmp',
    templateUrl: 'info.component.html'
})

export class InfoComponent implements OnInit{

    constructor(private http:HttpClient, private modal:NgbModal, private CS:CommunicationService, private router: Router){}

    ngOnInit(){
    }




}
