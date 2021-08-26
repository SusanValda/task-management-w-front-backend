import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({providedIn:'root'})
export class ApiService { 
  constructor(private http: HttpClient) {}
 
  getTasks(): Observable<any> {
    return this.http.get("http://localhost:3000/tasks")
  }

  addTask(task: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(task);
    console.log(body)
    return this.http.post("http://localhost:3000/tasks", body, {'headers': headers, responseType: 'text' })
  }

  updateTask(url_base:string, task: any){
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(task);

    return this.http.put(url_base, body, {'headers': headers,responseType: 'text' })
  }

  deleteTask(url_base:string){
    const headers = { 'content-type': 'application/json' }
    return this.http.delete(url_base,{responseType: 'text'})
  }

  updateStatusTask(url_base:string, task: any){
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(task);

    return this.http.put(url_base,body,{responseType:'text'})
  } 
}