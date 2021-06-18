import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'home-cmp',
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit{

    careers = ['Ing. Computadores', 'Ing. Electronica', 'Ing. Computacion', 'Ing. Materiales', 'Ing. Construccion'];
    courses = [];
    subjects = [];

    cont = 0

    currentCareer = '';
    currentCourse = '';
    currentSubject = '';

    ngOnInit(){
      
    }

    public setCourses(career, course){
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
        this.courses = ['UH', 'CC', 'FD', 'Jonito mi vida'];

        var x = document.getElementById("course");
        x.textContent = "Seleccionar";
      }else{
        this.currentCareer = career;
        this.courses =  ['CA', 'CC', 'Progrita', 'Cogida'];
        this.subjects = [];
      }
      this.cont ++;
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
        this.subjects = ['uy', 'yu', 'hg', 'cvbs'];
      }else{
        this.currentCourse = item;
        this.subjects =  ['Respuesta en frecuencia', 'Python', 'Java', 'Angelo mi amor'];
      }
    }

    public setCategory(item){
      if(item == 'Seleccionar'){
        this.currentSubject = '';
      }else{
        this.currentSubject = item;
      }
    }

}
