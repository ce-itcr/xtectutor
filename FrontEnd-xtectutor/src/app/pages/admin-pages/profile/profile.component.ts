import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'profile-cmp',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit{

    userData: any;
    userEntries: any;
    currentUsername = localStorage.getItem("currentUsername");

    constructor(private http:HttpClient, private modal:NgbModal){}

    ngOnInit(){
        this.getStudentsData();
    }

    openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

    getStudentsData(){
        let url = "https://sheet.best/api/sheets/ddfcf151-522d-44c6-81f7-714adafb7598/tabs/admindb/username/"+this.currentUsername;
        return this.http.get(url).subscribe(res => {
          this.userData = res;
          console.log(this.userData);
        });
      }
    
}
