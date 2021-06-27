import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient, private router: Router) { }
  
  getStudentData(username){
    return this.http.post<JSON>("api/user/get/info",
    {
      "username":username
    } 
    );
  }

  getStudentEntries(username, key){
    return this.http.post<any[]>("api/user/get/entries",
    {
      "username":username
    }).subscribe(res => {
      alert(res);
      var data = [];
      var cont = 0;
      while(cont < res.length){
        alert(res[cont]);
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("myEntries", JSON.stringify(data));
      if(key){
        globalThis.flag = 1;
        this.router.navigateByUrl("/terms");
      }
    }, error => {
      alert("Error al obtener entradas de estudiante")
    });
  }

  updateStudentPassword(username, password){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/userdb/username/"+ username;
    let body = {"password":password};
    return this.http.patch(url, body);
  }

  createEntry(username, creationDate, creationHour, title, description, entry, coauthors, career, course, subject, media){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/entriesdb";
    let body = {"username":username,"visibility":"pública", "visibilityType":"fa fa-eye", "visibilityColor": "btn-primary","creationDate":creationDate,"creationHour":creationHour,"lastUpdate":creationDate,"updateHour":creationHour,
                "views":"0","rating":"0","comments":"0", "title":title,"description":description, "entry":entry,"coauthors":coauthors,"career":career, "course":course,
                "subject":subject,"media":media
              };
    return this.http.post(url, body);
  }

  editEntry(username, creationDate, creationHour, updateDate, updateHour, title, description, entry, coauthors, career, course, subject, media){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/entriesdb";
    let body = {"username":username,"visibility":"public","creationDate":creationDate,"creationHour":creationHour,"lastUpdate":updateDate,"updateHour":updateHour,
                "views":"0","rating":"0","comments":"0", "title":title,"description":description, "entry":entry,"coauthors":coauthors,"career":career, "course":course,
                "subject":subject,"media":media
              };
    return this.http.post(url, body);
  }

  getAdminData(username){
    return this.http.post<JSON>("api/admin/get/info",
    {
      "username":username
    } 
    );
  }

  updateAdminPassword(username, password){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/admindb/username/"+ username;
    let body = {"password":password};
    return this.http.patch(url, body);
  }

  getAdminsList(key){
    return this.http.get<any[]>("api/admin/get/all/admins").subscribe( res => {
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
    });
  }

  createAdmin(username,password,adminName,mail, campus){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/admindb";
    let body = {"username":username,"password":password,"userType":"admin","adminName":adminName,"mail":mail,"campus":campus};
    return this.http.post(url, body);
  }

  removeAdmin(username){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/admindb/username/"+username;
    return this.http.delete(url);
  }

  getCareers(key){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/careersdb";
    return this.http.get<any>(url).subscribe(res => {
      var data = [];
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("careersList", JSON.stringify(data));
      if(key){
        globalThis.flag = 1;
        this.router.navigateByUrl("/profile");
      }
    }, error => {
      alert("Error al obtener lista de carreras")
    })
  }

  getCourses(key){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/coursesdb";
    return this.http.get<any>(url).subscribe(res => {
      var data = [];
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("coursesList", JSON.stringify(data));
      if(key){
        globalThis.flag = 1;
        this.router.navigateByUrl("/profile");
      }
    }, error => {
      alert("Error al obtener lista de cursos")
    })
  }

  getSubjects(key){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/subjectsdb";
    return this.http.get<any>(url).subscribe(res => {
      var data = [];
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("subjectsList", JSON.stringify(data));
      if(key){
        globalThis.flag = 1;
        this.router.navigateByUrl("/profile");
      }
    }, error => {
      alert("Error al obtener lista de temas")
    })
  }

  createCareer(careerName){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/careersdb";
    let body = {"careerName":careerName};
    return this.http.post(url, body);
  }

  createCourse(courseName,courseCode,associatedCareer){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/coursesdb";
    let body = {"category":"course","name":courseName,"code":courseCode,"associatedCareer":associatedCareer};
    return this.http.post(url, body);
  }

  createSubject(subjectName,associatedCourse){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/subjectsdb";
    let body = {"category":"subject","subjectName":subjectName,"associatedCourse":associatedCourse};
    return this.http.post(url, body);
  }

  uploadUsersData(data){
    this.removeStudents();
    this.removeProfessors();

    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/userdb";
    return this.http.post(url, data);

  }

  removeStudents(){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/userdb/userType/student";
    return this.http.delete(url).subscribe(res => {
      console.log(res);
    });
  }

  removeProfessors(){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/userdb/userType/professor";
    return this.http.delete(url).subscribe(res => {
      console.log(res);
    });
  }

  checkSubjectStatus(subject){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/entriesdb/subject/"+subject;
    return this.http.get(url);
  }

  removeSubject(subject){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/subjectsdb/subjectName/"+subject;
    return this.http.delete(url);
  }

  checkCourseStatus(course){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/entriesdb/course/"+course;
    return this.http.get(url);
  }

  removeCourse(course){
    this.removeAssociatedCourses(course).subscribe(res => {
      console.log(res);
    });
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/coursesdb/name/"+course;
    return this.http.delete(url);
  }
  
  removeAssociatedCourses(course){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/subjectsdb/associatedCourse/"+course;
    return this.http.delete(url);
  }

  checkCareerStatus(career){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/entriesdb/career/"+career;
    return this.http.get(url);
  }

  removeCareer(career){
    this.removeAssociatedCareer(career).subscribe(res => {
      console.log(res);
    });
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/careersdb/careerName/"+career;
    return this.http.delete(url);
  }

  removeAssociatedCareer(career){
    let url = "https://sheet.best/api/sheets/b058fed3-ae2a-482a-a447-2fe23b2314a7/tabs/coursesdb/associatedCareer/"+career;
    return this.http.delete(url);
  }


}
