import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({providedIn:'root'})
export class ApiService { 
  constructor(private http: HttpClient) {}
 
  getTasks(url_endPoint:string,token:any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `${token}`)
    }
    return this.http.get(url_endPoint,header)
  }

  getUser(url_endPoint:string,token:any) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `${token}`)
    }
    return this.http.get(url_endPoint,header)
  }

  addTask(url_endPoint:string, task: any, token:any){
    var headers:any = {
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization': `${token}`
    }
    const body = JSON.stringify(task);
    return this.http.post(url_endPoint, body, {'headers': headers, responseType: 'text' })
  }

  updateTask(url_endPoint:string, task: any,token:any){
    var headers:any = {
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization': `${token}`
    }
    const body = JSON.stringify(task);
    return this.http.put(url_endPoint, body, {'headers': headers, responseType: 'text' })
  }

  deleteTask(url_endPoint:string,token:any){
    var headers:any = {
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization': `${token}`
    }
    return this.http.delete(url_endPoint, {'headers': headers, responseType: 'text' })
  }

  updateStatusTask(url_endPoint:string, task: any,token:any){
    var headers:any = {
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization': `${token}`
    }
    const body = JSON.stringify(task);
    return this.http.put(url_endPoint,body, {'headers': headers,responseType: 'text' })
  } 

  addUser(url_endPoint:string, user: any){
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);
    return this.http.post(url_endPoint, body, {'headers': headers, responseType: 'text' })
  }

  authUser(url_endPoint:string, user: any){
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);
    return this.http.post(url_endPoint, body, {'headers': headers, responseType: 'json' })
  }
}