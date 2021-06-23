import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient, private router: Router) { }

  getStudentData(username){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/username/"+username;
    return this.http.get(url);
  }

  getStudentEntries(username){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/entriesdb/username/"+username;
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
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/userdb/username/"+ username;
    let body = {"password":password};
    return this.http.patch(url, body);
  }

  getAdminData(username){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/admindb/username/"+username;
    return this.http.get(url);
  }

  updateAdminPassword(username, password){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/admindb/username/"+ username;
    let body = {"password":password};
    return this.http.patch(url, body);
  }

  getAdminsList(key){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/admindb";
    return this.http.get<any>(url).subscribe(res => {
      var data = [];
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("adminsList", JSON.stringify(data));
      if(key){
        globalThis.flag = 1;
        this.router.navigateByUrl("/categories");
      }
    }, error => {
      alert("Error al obtener lista de administradores")
    })
  }

  createAdmin(username,password,adminName,mail, campus){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/admindb";
    let body = {"username":username,"password":password,"userType":"admin","adminName":adminName,"mail":mail,"campus":campus};
    return this.http.post(url, body);
  }

  removeAdmin(username){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/admindb/username/"+username;
    return this.http.delete(url);
  }

  getCareers(){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/careersdb";
    return this.http.get<any>(url).subscribe(res => {
      var data = [];
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("careersList", JSON.stringify(data));
    }, error => {
      alert("Error al obtener lista de carreras")
    })
  }

  getCourses(){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/coursesdb";
    return this.http.get<any>(url).subscribe(res => {
      var data = [];
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("coursesList", JSON.stringify(data));
    }, error => {
      alert("Error al obtener lista de cursos")
    })
  }

  getSubjects(){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/subjectsdb";
    return this.http.get<any>(url).subscribe(res => {
      var data = [];
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("subjectsList", JSON.stringify(data));
    }, error => {
      alert("Error al obtener lista de temas")
    })
  }

  createCareer(careerName){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/careersdb";
    let body = {"careerName":careerName};
    return this.http.post(url, body);
  }

  createCourse(courseName,courseCode,associatedCareer){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/coursesdb";
    let body = {"category":"course","name":courseName,"code":courseCode,"associatedCareer":associatedCareer};
    return this.http.post(url, body);
  }

  createSubject(subjectName,associatedCourse){
    let url = "https://sheet.best/api/sheets/2bd3dc67-3b3e-4429-81db-5a9a70755379/tabs/subjectsdb";
    let body = {"category":"subject","subjectName":subjectName,"associatedCourse":associatedCourse};
    return this.http.post(url, body);
  }




}
