import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser as fasUser } from '@fortawesome/free-solid-svg-icons';
import { faKey as fasKey } from '@fortawesome/free-solid-svg-icons';
import { faLock as fasLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertService } from '@full-fledged/alerts';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Registro';

  //Constructor y metodo al iniciar
  ngOnInit(): void {
  }

  constructor(library: FaIconLibrary, private router: Router, private apiService: ApiService, private alertService: AlertService) {
    library.addIcons(fasKey, fasLock, fasUser);
  }

  //Declaracion de variables 
  public isCollapsed = true;
  public confirm_pass = ''
  public currentUser: any = {
    user_name: '',
    user_pass: ''
  }
  url_endPoint: string = "";

  //Metodos
  addUser(formUser: NgForm): void {
    this.url_endPoint = "http://localhost:3000/user"
    this.currentUser = {
      user_name: formUser.value.user,
      user_pass: formUser.value.pass
    };

    this.apiService.addUser(this.url_endPoint, this.currentUser).subscribe((data: any) => {
      if (data == "Invalid") {
        this.alertService.danger('El nombre de usuario ya existe. Intente con otro.');
      } else {
        this.alertService.success('Usuario creado satisfactoriamente.');
        this.confirm_pass = '';
        this.currentUser = {
          user_name: '',
          user_pass: ''
        };
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
