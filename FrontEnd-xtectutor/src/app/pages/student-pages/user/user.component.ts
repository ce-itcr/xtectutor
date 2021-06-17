import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { StudentEntriesComponent } from './../../../data-tables/student-entries/student-entries.component';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{

    userData: any;
    currentUsername = localStorage.getItem("currentUsername");

    constructor(private http:HttpClient){}

    ngOnInit(){
        this.getStudentsData();
    }

    getStudentsData(){
        let url = "https://sheet.best/api/sheets/d48efa8c-42d4-4d4e-b2d8-a319c7dd5c2f/username/"+this.currentUsername;
        return this.http.get(url).subscribe(res => {
          this.userData = res;
          console.log(this.userData);
        });
      }
    
    modifyPassword(){
      alert("asdasd");
    }
}
