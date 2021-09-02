import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({providedIn:'root'})
export class ApiService { 
  constructor(private http: HttpClient) {}
 
  getTasks(url_endPoint:string) {
    return this.http.get(url_endPoint)
  }

  addTask(url_endPoint:string, task: any){
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(task);
    return this.http.post(url_endPoint, body, {'headers': headers, responseType: 'text' })
  }

  updateTask(url_endPoint:string, task: any){
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(task);
    return this.http.put(url_endPoint, body, {'headers': headers,responseType: 'text' })
  }

  deleteTask(url_endPoint:string){
    return this.http.delete(url_endPoint,{responseType: 'text'})
  }

  updateStatusTask(url_endPoint:string, task: any){
    const body = JSON.stringify(task);
    return this.http.put(url_endPoint,body,{responseType:'text'})
  } 
}