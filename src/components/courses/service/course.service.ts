import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { Course } from '../../../models/course';

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';
  private courseSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  myCourses$: Observable<Course[]> = this.courseSubject.asObservable();

  constructor(private http: HttpClient) { }




  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  addStudentToCourse(courseId: number, userId: number): any {
    return this.http.post<void>(`http://localhost:3000/api/courses/${courseId}/enroll`, { userId }).subscribe(()=>this.getUserCourses(courseId))  ;
  }
  getUserCourses(userId: number):void {
    this.http.get<Course[]>(`${this.apiUrl}/student/${userId}`).subscribe(
     (courses) => {
       this.courseSubject.next(courses);
     },
     (error) => alert('Error:' + error.message));
 }
  deleteCourseFromStudent(courseId: number, userId: number): Observable<void> {
    const body = { userId };
    return this.http.delete<void>(`http://localhost:3000/api/courses/${courseId}/unenroll`, { body });
  }
  getCourseById(id: number): Observable<Course> {
    console.log("in get course by id");

    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.courseSubject.pipe(
      switchMap(courseId => {
        if (courseId === null) throw new Error('Course ID is not set');
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      })
    );
  }

  isEnrolled(courseId: number):Observable< boolean> {
    const res = this.myCourses$.pipe(
      map((courses) => courses.some((course) => course.id === courseId))
    );
    return res;
  }

}


// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { Course } from '../../../models/course';

// @Injectable({
//   providedIn: 'root'
// })
// export class CourseService {
//   private apiUrl = 'http://localhost:3000/api/courses';
//   private token: string = '';
//   private courseIdSubject = new BehaviorSubject<number | null>(null);

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     if (typeof window !== 'undefined') {
//       this.token = sessionStorage.getItem('token') || '';
//     }
//     return new HttpHeaders({
//       Authorization: `Bearer ${this.token}`,
//       'Content-Type': 'application/json',
//     });
//   }

//   getAllCourses(): Observable<Course[]> {
//     return this.http.get<Course[]>(this.apiUrl, { headers: this.getHeaders() });
//   }

//   addStudentToCourse(courseId: number, userId: number): Observable<void> {
//     console.log("joined");
//     return this.courseIdSubject.pipe(
//       switchMap(id => {
//         if (id === null) throw new Error('Course ID is not set');
//         return this.http.post<void>(`${this.apiUrl}/${courseId}/enroll`, userId, { headers: this.getHeaders() });
//       })
//     );
//   }

//   deleteCourseFromStudent(courseId: number, userId: number): Observable<void> {
//     const body = { userId };
//     return this.courseIdSubject.pipe(
//       switchMap(id => {
//         if (id === null) throw new Error('Course ID is not set');
//         return this.http.delete<void>(`${this.apiUrl}/${courseId}/unenroll/`, { body, headers: this.getHeaders() });
//       })
//     );
//   }

//   getCourseById(id: number): Observable<Course> {
//     console.log("in get course by id");
//     return this.courseIdSubject.pipe(
//       switchMap(courseId => {
//         if (courseId === null) throw new Error('Course ID is not set');
//         return this.http.get<Course>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
//       })
//     );
//   }

//   createCourse(course: Course): Observable<Course> {
//     return this.http.post<Course>(this.apiUrl, course, { headers: this.getHeaders() });
//   }

//   updateCourse(id: number, course: Course): Observable<Course> {
//     return this.courseIdSubject.pipe(
//       switchMap(courseId => {
//         if (courseId === null) throw new Error('Course ID is not set');
//         return this.http.put<Course>(`${this.apiUrl}/${id}`, course, { headers: this.getHeaders() });
//       })
//     );
//   }

//   deleteCourse(id: number): Observable<void> {
//     console.log("in delete");
//     return this.courseIdSubject.pipe(
//       switchMap(courseId => {
//         if (courseId === null) throw new Error('Course ID is not set');
//         return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
//       })
//     );
//   }
// }
