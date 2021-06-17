import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'user-cmp',
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit{

    userData: any;
    userEntries: any;
    currentUsername = localStorage.getItem("currentUsername");

    constructor(private http:HttpClient, private modal:NgbModal){}

    ngOnInit(){
        this.getStudentsData();
        this.getStudentEntries();
    }

    openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

    getStudentsData(){
        let url = "https://sheet.best/api/sheets/7e73eed3-41f5-4fce-8cc3-338fa4281d84/username/"+this.currentUsername;
        return this.http.get(url).subscribe(res => {
          this.userData = res;
          console.log(this.userData);
        });
      }
    getStudentEntries(){
      let url = "https://sheet.best/api/sheets/7e73eed3-41f5-4fce-8cc3-338fa4281d84/tabs/inputsdb";
      return this.http.get(url).subscribe(res => {
        this.userEntries = res;
        console.log(this.userEntries);
      });   
    }
    
    modifyPassword(){
      alert("asdasd");
    }
}
