import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


    private apiUrl = 'http://localhost:3000/api';
    public current: User | Course | null = null;
    constructor(private http: HttpClient) { }
  
    // Register a new user
    // register(object: User|Course): Observable<any> {
    //   this.current=object;
    //   return this.http.post(`${this.apiUrl}/auth/register`, user);
    // }
  
    // // Login user
   
    
  getDataById(id: string, type: 'users' | 'courses') {

     return this.http.get<User|Course>(`${this.apiUrl}/${type}/${id}`);
   }
  
    getData(type: 'users' | 'courses')
    {
      return this.http.get<User[]|Course[]>(`${this.apiUrl}/${type}`)
    }
    createData(object:User|Course,type: 'users' | 'courses')
    {
      this.current=object
      return this.http.post<User|Course>(`${this.apiUrl}/auth/register `,object)
    }

    updateData(userId:string,object:User|Course,type: 'users' | 'courses')
    {
      this.current=object
      return this.http.put<User|Course>(`${this.apiUrl}/${type}/:${userId}`,object)
    }
    deleteData(userId:string,type: 'users' | 'courses')
    {
      return this.http.delete<void>(`${this.apiUrl}/${type}/:${userId}`)
    } 
}
