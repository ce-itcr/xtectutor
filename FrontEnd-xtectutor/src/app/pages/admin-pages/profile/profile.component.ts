import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'profile-cmp',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit{

    userData: any;
    userEntries: any;
    currentUsername = localStorage.getItem("currentUsername");

    constructor(private http:HttpClient, private modal:NgbModal, private CS:CommunicationService){}

    ngOnInit(){
        this.getAdminData();
    }

    openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

    getAdminData(){
      this.CS.getAdminData(this.currentUsername).subscribe(res => {
        this.userData = res;
        //console.log(this.userData)
      })
    }
    
}
