import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'profile-cmp',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit{

    userData: any;
    userEntries: any;
    currentUsername = localStorage.getItem("currentUsername");
    currentPassword = localStorage.getItem("currentPassword");

    constructor(private http:HttpClient, private modal:NgbModal, private CS:CommunicationService){}

    ngOnInit(){
      this.CS.getAdminsList(false);
      this.getAdminData();
    }

    openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

    getAdminData(){
      this.CS.getAdminData(this.currentUsername).subscribe(res => {
        this.userData = res;
        //console.log(this.userData)
      })
    }

    showPassword(inputId){
      var passwordInput = (<HTMLInputElement>document.getElementById(inputId));
        if(passwordInput.type == "password"){
          passwordInput.type = "text";
        } else {
          passwordInput.type = "password";
        }
    }

    updatePassword(currentPassword, newPassword, confirmationPassword){
      var status = true;
      if(currentPassword != this.currentPassword){
        alert("La contraseña actual es incorrecta.");
        status = false;
      } else if(newPassword != confirmationPassword){
        alert("Verifique su nueva contraseña y la confirmación.")
        status = false;
      } else if(newPassword.length < 8 ){
        alert("La contraseña que ingresó es menor a 8");
        status = false;
      } else if(status){
        this.CS.updateAdminPassword(this.currentUsername, newPassword).subscribe(res => {
          console.log(res);
        })
        alert("Contraseña actualizada")
        localStorage.setItem("currentPassword", newPassword);        
      }
    }

    createAdmin(adminName, mail, username, campus, password){
      this.CS.createAdmin(username,password,adminName,mail, campus).subscribe(res => {
        this.CS.getAdminsList(true);
        console.log(res);
      });
    }
}
