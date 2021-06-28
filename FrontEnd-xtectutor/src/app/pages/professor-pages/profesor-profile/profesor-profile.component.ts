import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'professor-profile-cmp',
    templateUrl: 'profesor-profile.component.html'
})

export class ProfesorProfileComponent implements OnInit{

    userData: any;
    currentUsername = localStorage.getItem("currentUsername");
    currentPassword = localStorage.getItem("currentPassword");

    constructor(private http:HttpClient, private modal:NgbModal, private CS:CommunicationService, private router: Router){}

    ngOnInit(){
        this.getProfessorData();
    }

    openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

    getProfessorData(){
        this.CS.getStudentData(this.currentUsername).subscribe(res => {
          this.userData = res;
          //console.log(this.userData)
        })
      }


}
