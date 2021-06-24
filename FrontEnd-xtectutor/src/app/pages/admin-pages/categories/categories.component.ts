import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'categories-cmp',
    moduleId: module.id,
    templateUrl: 'categories.component.html'
})

export class CategoriesComponent implements OnInit{

    careersData;
    coursesData;


    constructor(private modal:NgbModal, private CS:CommunicationService, private router: Router){}

    ngOnInit(){

        this.CS.getCareers(false);     
        this.CS.getCourses(false); 
        this.CS.getSubjects(false);

        if(globalThis.flag == 1){
            globalThis.flag = 0;
            this.router.navigateByUrl("/profile");
        }
    }

    openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

    updateCategoriesList(){
        this.CS.getCareers(true);
        this.CS.getCourses(true); 
        this.CS.getSubjects(true);
        location.reload();
    }

    createCareer(careerName){
        this.CS.createCareer(careerName).subscribe(res => {
            this.CS.getCareers(true); 
        })
    }
    
    createCourse(courseName,courseCode,associatedCareer){
        //alert(courseName + courseCode +associatedCareer)
        this.CS.createCourse(courseName,courseCode,associatedCareer).subscribe(res => {
            this.CS.getCourses(true); 
        })
    }

    createSubject(subjectName,associatedCourse){
        this.CS.createSubject(subjectName,associatedCourse).subscribe(res => {
            this.CS.getSubjects(true);
        })
    }

    setCareers(){
        var localData = localStorage.getItem("careersList");
        this.careersData = JSON.parse(localData);
    }

    setCourses(){
        var localData = localStorage.getItem("coursesList");
        this.coursesData = JSON.parse(localData);   
    }
}
