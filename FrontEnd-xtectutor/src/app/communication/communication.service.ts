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
      var data = [];
      var cont = 0;
      while(cont < res.length){
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
    alert(username + "\n" +
    creationDate + "\n" +
    creationHour + "\n" +
    title + "\n" +
    description + "\n" +
    entry + "\n" +
    coauthors + "\n" +
    career + "\n" +
    course + "\n" +
    subject + "\n" +
    media);
    let body = {"username":username,"visibility":"pública","creationDate":creationDate,"creationHour":creationHour,"lastUpdate":creationDate,"updateHour":creationHour,
                "views":"0","rating":"0.0", "title":title,"description":description, "entry":entry,"coauthors":coauthors,"career":career, "course":course,
                "subject":subject,"media":media};
    return this.http.post("api/user/add/entry", body);
  }

  editEntry(username, creationDate, creationHour, updateDate, updateHour, title, description, entry, coauthors, career, course, subject, media){
    let body = {"username":username,"creationDate":creationDate,"creationHour":creationHour,"lastUpdate":updateDate,"updateHour":updateHour,
                "title":title,"description":description, "entry":entry,"coauthors":coauthors,"career":career, "course":course,
                "subject":subject,"media":media
              };
    console.log(JSON.stringify(body));
    return this.http.post("api/user/update/entry", body);
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
    let body = {"username":username,"password":password,"adminName":adminName,"mail":mail,"campus":campus};
    return this.http.post("api/user/add/admin", body);
  }

  removeAdmin(username){
    return this.http.post<JSON>("api/user/delete/admin",
    {
      "username":username
    } 
    );
  }

  getCareers(key){
    return this.http.get<any>("api/admin/get/all/careers").subscribe(res => {
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
    return this.http.get<any>("api/admin/get/all/courses").subscribe(res => {
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
    return this.http.get<any>("api/admin/get/all/subjects").subscribe(res => {
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
    return this.http.post<any[]>("api/user/add/career",
    {
      "careerName":careerName,
    });
  }

  createCourse(courseName,courseCode,associatedCareer){
    return this.http.post<any[]>("api/user/add/course",
    {
      "name":courseName,
      "code":courseCode,
      "associatedCareer":associatedCareer
    });
  }

  createSubject(subjectName,associatedCourse){
    return this.http.post<any[]>("api/user/add/subject",
    {
      "subjectName":subjectName,
      "associatedCourse":associatedCourse
    });
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

  deleteSubject(subject){
    alert(subject);
    return this.http.post<any[]>("api/user/delete/subject",
    {
      "subjectName":subject
    });
  }

  deleteCourse(course){
    alert(course);
    return this.http.post<any[]>("api/user/delete/course",
    {
      "courseCode":course
    });
  }

  deleteCareer(career){
    alert(career);
    return this.http.post<any[]>("api/user/delete/career",
    {
      "careerName":career
    });
  }

  getCoauthors(entryID){
    return this.http.post<any[]>("api/user/get/selected/entry",
    {
      "EntryID":entryID
    });
  }

  visibilityChange(username, creationDate, lastUpdate, visibility){
    return this.http.post<any[]>("api/user/update/entry/visibility",
    {
      "username":username,
      "creationDate":creationDate,
      "creationHour":lastUpdate,
      "visibility":visibility
    });
  }

}
