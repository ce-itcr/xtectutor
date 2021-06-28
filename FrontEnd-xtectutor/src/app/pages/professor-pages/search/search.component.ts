import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'search-cmp',
    moduleId: module.id,
    templateUrl: 'search.component.html'
})

export class SearchComponent implements OnInit{

    careers = [];
    courses = [];
    subjects = [];
    currentCareer = '';
    currentCourse = '';
    currentSubject = '';

    currentUsername = localStorage.getItem("currentUsername");
    currentPassword = localStorage.getItem("currentPassword");

    constructor(private router: Router, private CS: CommunicationService, private modal:NgbModal){}

    ngOnInit(){
      if(globalThis.flag == 1){
        globalThis.flag = 0;
        this.router.navigateByUrl('/professor-profile');
      }

      this.generateCareers()
    }

    generateCareers(){
      this.careers = [];
      var localData = localStorage.getItem("careersList");
      localData = localData ? JSON.parse(localData) : [];
      var cont = 0;
      while(cont < localData.length){
        this.careers.push(localData[cont]["careerName"]);
        cont++;
      }
    }

    generateCourses(){
      this.courses = [];
      var localData = localStorage.getItem("coursesList");
      localData = localData ? JSON.parse(localData) : [];
      var cont = 0;
      while(cont < localData.length){
        if(localData[cont]["associatedCareer"] == this.currentCareer){
          this.courses.push(localData[cont]["code"]);
        }
        cont++;
      }
    }

    generateSubjects(){
      this.subjects = [];
      var localData = localStorage.getItem("subjectsList");
      localData = localData ? JSON.parse(localData) : [];
      var cont = 0;
      while(cont < localData.length){
        if(localData[cont]["associatedCourse"] == this.currentCourse){
          this.subjects.push(localData[cont]["subjectName"]);
        }
        cont++;
      }
    }

    public setCourses(career){
      if(career == 'Seleccionar'){
        this.currentCareer = '';
        this.currentCourse = '';
        this.currentSubject = '';
        this.courses = [];
        this.subjects = [];
      }else if(career != this.currentCareer && this.currentCareer != ''){
        this.currentCareer = career;
        this.currentCourse = '';
        this.currentSubject = '';
        //COMUNICACION
        this.generateCourses();
        this.subjects = [];
      }else{
        this.currentCareer = career;
        this.generateCourses();
        this.subjects = [];
      }
    }

    public setSubjects(item){
      if(item == 'Seleccionar'){
        this.currentCourse = '';
        this.currentSubject = '';
        this.subjects = [];
      }else if(item != this.currentCourse && this.currentCourse != ''){
        this.currentCourse = item;
        this.currentSubject = '';
        //COMUNICACION
        this.generateSubjects();
      }else{
        this.currentCourse = item;
        this.generateSubjects();
      }
    }

    public setCategory(item){
      if(item == 'Seleccionar'){
        this.currentSubject = '';
      }else{
        this.currentSubject = item;
      }
    }


    searchEntries(career, course, subject){
      if(career != "Seleccionar" && course != "Seleccionar" && subject != "Seleccionar"){
        this.CS.searchProfessorEntries(this.currentUsername, career, course, subject, true);
      }else {
        alert("Debe seleccionar todas las categorías")
      }
    }

}
