import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tareas pendientes';

  public tasks: any[] = [];  
  public currentTask: any = {
    title: '',
    detail: ''
  }

  constructor(public modal: NgbModal, public modal2: NgbModal, private http: HttpClient,private apiService:ApiService) {}

  ngOnInit() {
    this.refreshTasks();
  }

  refreshTasks() {
    this.apiService.getTasks().subscribe((dataTask: any) => {
      console.log(dataTask);
      this.tasks = dataTask;
    });
  }

  json: any;
  url: string = "";
  @ViewChild('modalAdd') modalAdd: any;
  closeResultAdd: any;

  abrirTarea(): void {
    this.modal.open(this.modalAdd).result.then((result: any) => {
      this.closeResultAdd = `Closed with: ${result}`;
    }, (reason: any) => {
      console.log(reason);
    });

    this.currentTask = {
      title: '',
      detail: ''
    };
  }

  agregarTarea(formTask: NgForm): void {
    this.currentTask = {
      title: formTask.value.title,
      detail: formTask.value.detail
    };

    this.apiService.addTask(this.currentTask).subscribe((data: any) => {
      console.log(data)
      this.refreshTasks();
    });

    this.currentTask = {
      title: '',
      detail: ''
    };
  }


  borrarTarea(i: any): void {
    var res = confirm("¿Desea eliminar el elemento seleccionado?");
    if (res) {
      this.url = "http://localhost:3000/tasks/"
      this.url += this.tasks[i].id;
      console.log(this.url);
      this.apiService.deleteTask(this.url).subscribe((data: any) => {
        console.log(data)
        this.refreshTasks();
      });
    }
  }

  valor: any;
  @ViewChild('modalEdit') modalEdit: any;
  closeResult: any;

  editarTarea(i: any): void {
    this.modal2.open(this.modalEdit).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      console.log(reason);
    });

    this.currentTask.title = this.tasks[i].title;
    this.currentTask.detail = this.tasks[i].detail;
    this.valor = i;
  }

  actualizarTarea(): void {
    if (this.currentTask.title != "") {    
      let i = this.valor;
      this.url = "http://localhost:3000/tasks/"
      this.url += this.tasks[i].id;

      this.apiService.updateTask(this.url,this.currentTask).subscribe(data => {
        console.log(data)
        this.refreshTasks();
      });     

      this.currentTask = {
        title: '',
        detail: ''
      };
    }
  }

  completarTarea(i: any): void {    
    this.currentTask.title = this.tasks[i].title;
    this.currentTask.detail = this.tasks[i].detail;
    this.url = "http://localhost:3000/tasks/"
    this.url += this.tasks[i].id; 
    this.url += "?status=completed";   
    
    this.apiService.updateStatusTask(this.url,this.currentTask).subscribe(data => {
      console.log(data)
      this.refreshTasks();
    });  

    this.currentTask = {
      title: '',
      detail: ''
    };
  }

  reiniciarTarea(i: any): void {
    this.currentTask.title = this.tasks[i].title;
    this.currentTask.detail = this.tasks[i].detail;
    this.url = "http://localhost:3000/tasks/"
    this.url += this.tasks[i].id; 
    this.url += "?status=pending";   
    
    this.apiService.updateStatusTask(this.url,this.currentTask).subscribe(data => {
      console.log(data)
      this.refreshTasks();
    });  

    this.currentTask = {
      title: '',
      detail: ''
    };
  }
}
