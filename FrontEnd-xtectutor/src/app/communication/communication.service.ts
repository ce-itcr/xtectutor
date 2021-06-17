import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient, private router: Router) { }

  //SEND DATA TO LOG IN A STUDENT
  studentLogIn(username, password){
    //Por hacer
  }



  /*fetchData() {
    let url = "https://sheet.best/api/sheets/640835f1-dadd-4230-83bd-4220254d8887/professor/"+this.currentProfessor;

    return this.http.get(url).subscribe(res => {
      this.userData = res;
      this.totalCourses = Object.keys(res).length;
    });
  }*/


}
