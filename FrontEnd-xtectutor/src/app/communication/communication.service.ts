import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient, private router: Router) { }

  getStudentData(username){
    let url = "https://sheet.best/api/sheets/d438c9c1-8af2-40a2-a4b3-c4cfa7e375e7/username/"+username;
    return this.http.get(url);
  }

  getStudentEntries(username){
    let url = "https://sheet.best/api/sheets/d438c9c1-8af2-40a2-a4b3-c4cfa7e375e7/tabs/entriesdb/username/"+username;
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
    let url = "https://sheet.best/api/sheets/d438c9c1-8af2-40a2-a4b3-c4cfa7e375e7/tabs/userdb/username/"+ username;
    let body = {"password":password};
    return this.http.patch(url, body);
  }

  getAdminData(username){
    let url = "https://sheet.best/api/sheets/d438c9c1-8af2-40a2-a4b3-c4cfa7e375e7/tabs/admindb/username/"+username;
    return this.http.get(url);
  }

  updateAdminPassword(username, password){
    let url = "https://sheet.best/api/sheets/d438c9c1-8af2-40a2-a4b3-c4cfa7e375e7/tabs/admindb/username/"+ username;
    let body = {"password":password};
    return this.http.patch(url, body);
  }

  getAdminsList(){
    let url = "https://sheet.best/api/sheets/d438c9c1-8af2-40a2-a4b3-c4cfa7e375e7/tabs/admindb";
    return this.http.get<any>(url).subscribe(res => {
      var data = [];
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("adminsList", JSON.stringify(data));
    }, error => {
      alert("Error al obtener lista de administradores")
    })
  }

  createAdmin(username,password,adminName,mail, campus){
    let url = "https://sheet.best/api/sheets/d438c9c1-8af2-40a2-a4b3-c4cfa7e375e7/tabs/admindb";
    let body = {"username":username,"password":password,"userType":"admin","adminName":adminName,"mail":mail,"campus":campus};
    return this.http.post(url, body);
  }

  removeAdmin(username){
    let url = "https://sheet.best/api/sheets/d438c9c1-8af2-40a2-a4b3-c4cfa7e375e7/tabs/admindb/username/"+username;
    return this.http.delete(url);
  }

}
