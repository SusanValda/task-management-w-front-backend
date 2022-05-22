import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '@full-fledged/alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Inicio de sesión';

  //Constructor y metodo de inicio
  constructor(private router: Router, private apiService: ApiService,private alertService: AlertService) { }
  ngOnInit(): void {
  }

  //Declaracion de variables
  public isCollapsed = true;
  public currentUser: any = {
    user_name: '',
    user_pass: ''
  }
  url_endPoint: string = "";

  //Metodos
  register() {
    this.router.navigate(['/register']);
  }

  authUser(formUser: NgForm): void {
    this.url_endPoint = "http://localhost:3000/auth"
    this.currentUser = {
      user_name: formUser.value.user,
      user_pass: formUser.value.pass
    };

    this.apiService.authUser(this.url_endPoint, this.currentUser).subscribe((data: any) => {
      if(data.token==null){
        this.alertService.danger('Usuario o contraseña incorrectos. Intente de nuevo.');
      }else{
        this.router.navigate(['/tasks']);
        localStorage.setItem('auth_token', data.token);

        this.currentUser = {
          user_name: '',
          user_pass: ''
        };
      }      
    });    
  }
}
