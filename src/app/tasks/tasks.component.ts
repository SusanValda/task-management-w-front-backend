import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  title = 'Tareas pendientes';
  public isCollapsed = true;
  helper = new JwtHelperService();

  public tasks: any[] = [];
  public currentUser: any;
  public currentTask: any = {
    task_title: '',
    task_detail: ''
  }

  constructor(public modal: NgbModal, public modal2: NgbModal, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getUser();
    this.refreshTasks();
  }

  getUser() {
    if (this.logIn) {
      const token = localStorage.getItem('auth_token');
      this.url_endPoint = "http://localhost:3000/user";
      this.apiService.getUser(this.url_endPoint, token).subscribe((dataUser: any) => {
        this.currentUser = dataUser[0].user_name;
      });
    } else {
      this.logOut();
    }
  }

  refreshTasks() {
    if (this.logIn) {
      const token = localStorage.getItem('auth_token');
      this.url_endPoint = "http://localhost:3000/tasks";
      this.apiService.getTasks(this.url_endPoint, token).subscribe((dataTask: any) => {
        this.tasks = dataTask;
      });
    } else {
      this.logOut();
    }
  }

  url_endPoint: string = "";
  @ViewChild('modalAdd') modalAdd: any;
  closeResultAdd: any;

  openAddTask(): void {
    if (this.logIn) {
      this.modal.open(this.modalAdd).result.then((result: any) => {
        this.closeResultAdd = `Closed with: ${result}`;
      }, (reason: any) => {
        console.log(reason);
      });

      this.currentTask = {
        task_title: '',
        task_detail: ''
      };
    } else {
      this.logOut();
    }
  }

  addTask(formTask: NgForm): void {
    if (this.logIn) {
      this.currentTask = {
        task_title: formTask.value.title,
        task_detail: formTask.value.detail
      };

      this.url_endPoint = "http://localhost:3000/tasks"
      const token = localStorage.getItem('auth_token');
      this.apiService.addTask(this.url_endPoint, this.currentTask, token).subscribe((data: any) => {
        this.refreshTasks();
      });

      this.currentTask = {
        task_title: '',
        task_detail: ''
      };
    } else {
      this.logOut();
    }
  }

  deleteTask(i: any): void {
    if (this.logIn) {
      const token = localStorage.getItem('auth_token');
      var res = confirm("¿Desea eliminar el elemento seleccionado?");
      if (res) {
        this.url_endPoint = "http://localhost:3000/tasks/"
        this.url_endPoint += this.tasks[i].task_id;
        this.apiService.deleteTask(this.url_endPoint, token).subscribe((data: any) => {
          this.refreshTasks();
        });
      }
    } else {
      this.logOut();
    }
  }

  valor: any;
  @ViewChild('modalEdit') modalEdit: any;
  closeResult: any;

  openEditTask(i: any): void {
    if (this.logIn) {
      this.modal2.open(this.modalEdit).result.then((result: any) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason: any) => {
        console.log(reason);
      });

      this.currentTask.task_title = this.tasks[i].task_title;
      this.currentTask.task_detail = this.tasks[i].task_detail;
      this.valor = i;
    } else {
      this.logOut();
    }
  }

  updateTask(): void {
    if (this.logIn) {
      const token = localStorage.getItem('auth_token');
      if (this.currentTask.task_title != "") {
        let i = this.valor;
        this.url_endPoint = "http://localhost:3000/tasks/"
        this.url_endPoint += this.tasks[i].task_id;

        this.apiService.updateTask(this.url_endPoint, this.currentTask, token).subscribe(data => {
          this.refreshTasks();
        });

        this.currentTask = {
          task_title: '',
          task_detail: ''
        };
      }
    } else {
      this.logOut();
    }
  }

  completeTask(i: any): void {
    if (this.logIn) {
      const token = localStorage.getItem('auth_token');
      this.currentTask.task_title = this.tasks[i].task_title;
      this.currentTask.task_detail = this.tasks[i].task_detail;
      this.url_endPoint = "http://localhost:3000/tasks/"
      this.url_endPoint += this.tasks[i].task_id;
      this.url_endPoint += "?status=completed";

      this.apiService.updateStatusTask(this.url_endPoint, this.currentTask, token).subscribe(data => {
        this.refreshTasks();
      });

      this.currentTask = {
        task_title: '',
        task_detail: ''
      };
    } else {
      this.logOut();
    }
  }

  restartTask(i: any): void {
    if (this.logIn) {
      const token = localStorage.getItem('auth_token');
      this.currentTask.task_title = this.tasks[i].task_title;
      this.currentTask.task_detail = this.tasks[i].task_detail;
      this.url_endPoint = "http://localhost:3000/tasks/"
      this.url_endPoint += this.tasks[i].task_id;
      this.url_endPoint += "?status=pending";

      this.apiService.updateStatusTask(this.url_endPoint, this.currentTask, token).subscribe(data => {
        this.refreshTasks();
      });

      this.currentTask = {
        task_title: '',
        task_detail: ''
      };
    } else {
      this.logOut();
    }
  }

  logOut() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  public get logIn(): boolean {
    const token = localStorage.getItem('auth_token');
    if (token !== null) {
      return !this.helper.isTokenExpired(token);
    } else {
      return false;
    }
  }
}
