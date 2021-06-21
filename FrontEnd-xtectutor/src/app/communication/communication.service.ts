import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient, private router: Router) { }

  getStudentData(username){
    let url = "https://sheet.best/api/sheets/ddfcf151-522d-44c6-81f7-714adafb7598/username/"+username;
    return this.http.get(url);
  }

  getStudentEntries(username){
    let url = "https://sheet.best/api/sheets/ddfcf151-522d-44c6-81f7-714adafb7598/tabs/entriesdb/username/"+username;
    return this.http.get<any>(url).subscribe(res => {
      var data = [];
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("myEntries", JSON.stringify(data));
    }, error => {
      alert("Error al obtener entradas de estudiante")
    })
  }

  updateStudentPassword(username, password){
    let url = "https://sheet.best/api/sheets/ddfcf151-522d-44c6-81f7-714adafb7598/tabs/userdb/username/"+ username;
    let body = {"password":password};
    return this.http.patch(url, body);
  }

  getAdminData(username){
    let url = "https://sheet.best/api/sheets/ddfcf151-522d-44c6-81f7-714adafb7598/tabs/admindb/username/"+username;
    return this.http.get(url);
  }
}
