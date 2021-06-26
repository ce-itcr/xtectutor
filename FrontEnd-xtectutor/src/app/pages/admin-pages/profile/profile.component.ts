import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'profile-cmp',
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit{

    userData: any;
    userEntries: any;
    currentUsername = localStorage.getItem("currentUsername");
    currentPassword = localStorage.getItem("currentPassword");
    data: [][];
    finalData;

    constructor(private http:HttpClient, private modal:NgbModal, private CS:CommunicationService, private router: Router){}

    ngOnInit(){
      if(globalThis.flag == 1){
        globalThis.flag = 0;

        this.router.navigateByUrl('/categories')
      }
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
      });
      //alert("El usuario " + adminName + " fue creado exitosamente")
    }

    onFileChange(evt: any) {
      const target : DataTransfer =  <DataTransfer>(evt.target);
    
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  
      const reader: FileReader = new FileReader();
  
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
  
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  
        const wsname : string = wb.SheetNames[0];
  
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        //console.log(ws);
  
        this.data = (XLSX.utils.sheet_to_json(ws, { header: 0 }));
  
        console.log(this.data);

  
      };
  
      reader.readAsBinaryString(target.files[0]);

    }

    uploadData(){
      this.CS.uploadUsersData(this.data).subscribe(res => {
        console.log(res);
        alert("Actualización de usuarios exitosa.")
      }) 
    }


}
