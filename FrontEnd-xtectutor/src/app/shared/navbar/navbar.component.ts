import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CommunicationService } from 'app/communication/communication.service';

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

    currentUsername = localStorage.getItem("currentUsername");
    creationDate;
    creationHour;
    careers = [];
    courses = [];
    subjects = [];
    currentCareer = '';
    currentCourse = '';
    currentSubject = '';
    coAuthorsCounter = 0;
    coAuthorsList = [];
    mediaCounter = 0;
    mediaList = [];


    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button;

    constructor(private http:HttpClient, private modal:NgbModal, location:Location, private renderer : Renderer2, private element : ElementRef, private router: Router, private CS:CommunicationService) {
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
       this.setCreationDate();
       this.generateCareers();

    }

    setCreationDate(){
      var today = new Date();
      var date = "0" + (today.getMonth()+1) + '/' + today.getDate() +'/' + today.getFullYear();
      this.creationDate = date;
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      this.creationHour = time;

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

    setCreateButtonStatus(){
      if(localStorage.getItem("userType") == "student"){
        (document.getElementById('createButton') as HTMLInputElement).disabled = false;
      } else{
        (document.getElementById('createButton') as HTMLInputElement).disabled = true;
      }
    }

    openModal(content){ this.modal.open(content,{size:'xl', centered:true});}
    openModalmd(content){ this.modal.open(content,{size:'md', centered:true});}

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

    toInfo(){
      if(localStorage.getItem("userType") == "student"){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['info']));
      } else if(localStorage.getItem("userType") == "admin"){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['info']));
      }
    }

    toTermsOfService(){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['terms']));
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

      public generateCoauthorsInputs(){
        /*let row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = `<br><input type="number" #coAuthor`+ this.coAuthorsCounter +`class="form-control">`;
        row.id = 'coAuthor' + this.coAuthorsCounter;
        document.querySelector('.showInputField').appendChild(row);
        this.coAuthorsCounter++;
        alert(row.id)*/
        var textfield = document.createElement('input');
        textfield.type = "number"; textfield.value = ""; textfield.id = "coAuthor"+this.coAuthorsCounter;
        document.querySelector('.showInputField').appendChild(textfield);
        this.coAuthorsCounter++;
      }

      public generateMediaInputs(){
        var textfield = document.createElement('input');
        textfield.type = "text"; textfield.value = ""; textfield.id = "link"+this.mediaCounter;
        document.querySelector('.showMediaInputField').appendChild(textfield);
        this.mediaCounter++;
      }

      addCoauthors(){
        var localCounter = 0;
        while(localCounter < this.coAuthorsCounter){
          var coAuthorValue = <HTMLInputElement>document.getElementById("coAuthor" +localCounter);
          this.coAuthorsList.push(coAuthorValue.value);
          localCounter++;          
        }
      }

      addMedia(){
        var localCounter = 0;
        while(localCounter < this.mediaCounter){
          var mediaValue = <HTMLInputElement>document.getElementById("link" +localCounter);
          this.mediaList.push(mediaValue.value);
          localCounter++;          
        }
      }

      createEntry(title, description, entry, career, course, subject){
        this.addCoauthors();
        this.addMedia();
        this.setCreationDate();   

        this.CS.createEntry(this.currentUsername, this.creationDate, this.creationHour, title, description, entry, this.coAuthorsList, career, course, subject, this.mediaList).subscribe(res => {
          this.CS.getStudentEntries(this.currentUsername, true);
        }, error => {
          alert(error);
        })
      
      }
}
