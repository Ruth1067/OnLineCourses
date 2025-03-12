// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Lesson } from '../../../models/lesson';
// import { ActivatedRoute } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class LessonService {
//   courseId!: number;
//   private apiUrl = `http://localhost:3000/api/courses/${this.courseId}/lessons`;
//   constructor(private http: HttpClient, private route: ActivatedRoute) {
//     console.log("in lessons service");
//     this.route.params.subscribe(
//       params => {
//         this.courseId = +params['courseId']
//       }
//     )

//   }

//   private getHeaders(): HttpHeaders {
//     const token = sessionStorage.getItem('token');
//     console.log(token);
//     return new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     });
//   }

//   getAllLessons(): Observable<Lesson[]> {
//     console.log("t: " + this.getHeaders());
//     return this.http.get<Lesson[]>(this.apiUrl, { headers: this.getHeaders() });
//   }


//   getLessonById(idLesson: number): Observable<Lesson> {
//     return this.http.get<Lesson>(`${this.apiUrl}/${idLesson}`, { headers: this.getHeaders() });
//   }


//   createLesson(lesson: Lesson): Observable<Lesson> {
//     return this.http.post<Lesson>(`${this.apiUrl}`, lesson, { headers: this.getHeaders() });
//   }


//   updateLesson(id: number, Lesson: Partial<Lesson>): Observable<Lesson> {
//     return this.http.put<Lesson>(`${this.apiUrl}/${id}`, Lesson, { headers: this.getHeaders() });
//   }

//   deleteLesson(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
//   }
// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Lesson } from '../../../models/lesson';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessonSubject:BehaviorSubject<Lesson[] > = new BehaviorSubject<Lesson[] >([]);
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    console.log("in lessons service");
    this.route.params.subscribe(params => {
      const courseId = +params['courseId'];
    });
  }


  getAllLessons(courseId:number):Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`)
  
  }

  getLessonById(idLesson: number): Observable<Lesson> {
    return this.lessonSubject.pipe(
      switchMap(courseId => {
        if (courseId === null) throw new Error('Course ID is not set');
        return this.http.get<Lesson>(`${this.apiUrl}/${courseId}/lessons/${idLesson}`);
      })
    );
  }

  createLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiUrl}/${lesson.courseId}/lessons`, lesson).pipe(
      tap((newL) => {
        this.lessonSubject.next([...this.lessonSubject.getValue(), newL]);
      })
    );
  }

  updateLesson(id: number, lesson: Partial<Lesson>,courseId:number): Observable<Lesson> {
      return this.http.put<Lesson>(`${this.apiUrl}/${courseId}/lessons/${id}`, lesson);
  }

  deleteLesson(id: number): Observable<void> {
    return this.lessonSubject.pipe(
      switchMap(courseId => {
        if (courseId === null) throw new Error('Course ID is not set');
        return this.http.delete<void>(`${this.apiUrl}/${courseId}/lessons/${id}`);
      })
    );
  }
}
