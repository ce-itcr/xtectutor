import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent{
  constructor(private router: Router, private CS:CommunicationService) {}

  showPassword(inputId){
    var passwordInput = (<HTMLInputElement>document.getElementById(inputId));
      if(passwordInput.type == "password"){
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
  }

  //VERIFICA QUE LOS DATOS INGRESADOS PERTENEZCAN A UN USUARIO REGISTRADO
  //POSTERIORMENTE SE ENVÍA AL COMPONENTE RESPECTIVO
  //RECIBE: NOMBRE DE USUARIO Y CONTRASEÑA, RESPECTIVAMENTE
  verifyLogin(username, password, type){
    localStorage.setItem("currentUsername", username);
    localStorage.setItem("currentPassword", password);
    localStorage.setItem("userType", type);

    if(type == "student"){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['home']));
    }
    else if(type == "professor"){
        alert("Profesor")
    }
    else if(type == "admin"){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['categories']));
    }
  }



}
