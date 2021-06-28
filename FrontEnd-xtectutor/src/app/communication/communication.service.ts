import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { post } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient, private router: Router) { }

  public verifyUser(username, password, userType){
    return this.http.post<JSON>("api/user/login/verify", 
    { 
      "username": username, "password": password, "userType": userType
    });
  }

  
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
        location.reload();
        globalThis.flag = 1;
        this.router.navigateByUrl("/terms");
      }
    }, error => {
      alert("Error al obtener entradas de estudiante")
    });
  }

  updateStudentPassword(username, password){
    return this.http.post<any[]>("api/user/update/password",
    {
      "username":username,
      "password":password,
    });
  }

  createEntry(username, creationDate, creationHour, title, description, entry, coauthors, career, course, subject, media){
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
    return this.http.post<any[]>("api/admin/update/password",
    {
      "username":username,
      "password":password,
    });
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
    return this.http.post<any[]>("api/admin/upload/excel",
    data);
  }

  deleteSubject(subject){
    return this.http.post<any[]>("api/user/delete/subject",
    {
      "subjectName":subject
    });
  }

  deleteCourse(course){
    return this.http.post<any[]>("api/user/delete/course",
    {
      "courseCode":course
    });
  }

  deleteCareer(career){
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

  searchStudentsEntries(username, career, course, subject, key){
    return this.http.post<any[]>("api/user/search/entries",
    {
      "username":username,
      "career":career,
      "course":course,
      "subject":subject
    }).subscribe( res => {

      var data = [];
      var cont = 0;
      while(cont < res.length){
        data.push(res[cont]);
        cont++;
      }
      localStorage.setItem("studentsEntries", JSON.stringify(data));
      if(key){
        globalThis.flag = 1;
        this.router.navigateByUrl("/user");
      }
    }, error => {
      alert("Error al obtener")
    });
  }

  sendComment(comment, EntryID){
    return this.http.post<any[]>("api/user/add/comment",
    {
      "comment":comment,
      "EntryID": EntryID
    });
  }

}
