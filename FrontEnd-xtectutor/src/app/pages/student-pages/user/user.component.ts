import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-cmp',
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit{

    userData: any;
    userEntries: any;
    currentUsername = localStorage.getItem("currentUsername");

    constructor(private http:HttpClient){}

    ngOnInit(){
        this.getStudentsData();
        this.getStudentEntries();
    }

    getStudentsData(){
        let url = "https://sheet.best/api/sheets/d48efa8c-42d4-4d4e-b2d8-a319c7dd5c2f/username/"+this.currentUsername;
        return this.http.get(url).subscribe(res => {
          this.userData = res;
          console.log(this.userData);
        });
      }
    getStudentEntries(){
      let url = "https://sheet.best/api/sheets/d48efa8c-42d4-4d4e-b2d8-a319c7dd5c2f/tabs/inputsdb";
      return this.http.get(url).subscribe(res => {
        this.userEntries = res;
        console.log(this.userEntries);
      });   
    }
    
    modifyPassword(){
      alert("asdasd");
    }
}
