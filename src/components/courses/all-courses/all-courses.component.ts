import { Component } from '@angular/core';
import { Course } from '../../../models/course';
import { CourseService } from '../service/course.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../connection/Authentication/service/authentication.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-all-courses',
  imports: [MatCardModule, MatGridListModule, MatButtonModule, RouterOutlet],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent {


  allCourses: Course[] = [];
  courses: Course[] = [];

  constructor(private router: Router, public courseService: CourseService, public authService: AuthenticationService) {
    console.log("in all courses constructor");
    courseService.getAllCourses().subscribe((data) => { this.allCourses = data });
  }

  joinCourse(course: Course) {
    this.courseService.getCourseById(course.id).subscribe(res=>
      console.log(res)
    )
    this.courseService.addStudentToCourse(course.id, this.authService.currentUser?.id as number).subscribe(()=>{
    console.log(this.authService.currentUser?.id);

    });

  }

  leaveCourse(course: Course) {
    this.courseService.deleteCourseFromStudent(course.id, this.authService.currentUser?.id as number).subscribe();
    this.courses.filter(c => c.id != course.id);

  }

  showDetails(course: Course) {
    console.log(course.id);
    this.router.navigate([`courses/${course.id}/lessons`]);
  }
  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course.id).subscribe(data=>{this.allCourses.filter(c=>c.id!=course.id)});
  }

  createCourse() {
    this.router.navigate([`courses/add`]);
  }
  updateCourse(course: Course) {
    this.router.navigate([`courses/edit/${course.id}`]);
  }

}
