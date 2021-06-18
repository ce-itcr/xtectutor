import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
  
    careers = ['Hola hola', 'Bye bye'];
    courses = [];
    subjects = [];
    currentCareer = '';
    currentCourse = '';
    currentSubject = '';

    currentUsername = localStorage.getItem("currentUsername");

    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button;

    constructor(private http:HttpClient, private modal:NgbModal, location:Location, private renderer : Renderer2, private element : ElementRef, private router: Router) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
        this.setCreateButtonStatus();
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });

    }

    setCreateButtonStatus(){
      if(localStorage.getItem("userType") == "student"){
        (document.getElementById('createButton') as HTMLInputElement).disabled = false;
      } else{
        (document.getElementById('createButton') as HTMLInputElement).disabled = true;
      }
    }

    openModal(content){ this.modal.open(content,{size:'xl', centered:true});}

    toUserProfile(){
      if(localStorage.getItem("userType") == "student"){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['user']));
      } else if(localStorage.getItem("userType") == "admin"){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['profile']));
      }
    }

    toHome(){
      if(localStorage.getItem("userType") == "student"){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['home']));
      } else if(localStorage.getItem("userType") == "admin"){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['categories']));
      }
    }

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };
      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          if (window.innerWidth < 991) {
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      };
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        console.log(navbar);
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

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
          this.subjects = [];
        }else{
          this.currentCareer = career;
          this.courses =  ['CA', 'CC', 'Progrita', 'Cogida'];
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
