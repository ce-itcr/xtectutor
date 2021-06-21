import { Component, OnInit } from '@angular/core';
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


    constructor(private modal:NgbModal, private CS:CommunicationService){}

    ngOnInit(){
      this.CS.getCareers();     
      this.CS.getCourses(); 
    }

    openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

    createCareer(careerName){
        this.CS.createCareer(careerName).subscribe(res => {
            console.log(res);
        })
    }
    
    createCourse(courseName,courseCode,associatedCareer){
        //alert(courseName + courseCode +associatedCareer)
        this.CS.createCourse(courseName,courseCode,associatedCareer).subscribe(res => {
            console.log(res);
        })
    }

    createSubject(subjectName,associatedCourse){
        this.CS.createSubject(subjectName,associatedCourse).subscribe(res => {
            console.log(res);
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
