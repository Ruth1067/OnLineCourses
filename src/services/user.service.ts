import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpService } from './http.service';
import { Course } from '../models/course';
import { log } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';  // Change this to your API URL
  public currentUser: User | null = null;
  constructor(private httpService: HttpService, private http: HttpClient) { }

  // Register a new user
 
  getUserById(userId: string): Observable<User | Course> {
    return this.httpService.getDataById(userId, 'users');
  }


  getUsers(): Observable<User[] | Course[]> {
    return this.httpService.getData("users")
  }

  updateUser(userId: string, user: User): Observable<User | Course> {
    this.currentUser = user
    return this.httpService.updateData(userId, user, 'users')
  }
  deleteUser(userId: string): Observable<void> {
    this.currentUser = null
    return this.httpService.deleteData(userId, 'users')
  }
}

