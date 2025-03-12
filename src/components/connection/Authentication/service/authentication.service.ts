import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


    private apiUrl = 'http://localhost:3000/api/auth';
    public isLoggedIn:boolean = false; 
    public isTeacher:boolean=false;
    public currentUser: User | null = null;
    constructor( private http: HttpClient) { }
  
    // Register a new user
    register(user: User): Observable<any> {
      console.log("in register user service");
      this.currentUser = user;
      console.log(" email "+user.email+" passward "+user.password+" name "+user.name+" role "+user.role);
      console.log(`${this.apiUrl}/auth/register`);
      return this.http.post(`${this.apiUrl}/register`, user);
    }

    login(credentials: { email: string; password: string }): Observable<any> {
      
      return this.http.post(`${this.apiUrl}/login`, credentials);
    }
  
}
