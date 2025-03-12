import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { LessonService } from '../../lessons/service/lessons.service';
import { Lesson } from '../../../models/lesson';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthenticationService } from '../../connection/Authentication/service/authentication.service';

@Component({
  selector: 'app-display-course',
  imports: [MatCardModule, MatGridListModule, MatButtonModule, RouterModule],
  templateUrl: './display-course.component.html',
  styleUrl: './display-course.component.css'
})
export class DisplayCourseComponent {
  AddLesson() {
    this.route.navigate([`courses/${this.courseId}/lessons/add`]);
  }
  deleteLesson(lesson: Lesson) {
    this.lessonService.deleteLesson(lesson.id).subscribe(() => this.lessons = this.lessons.filter(l => l !== lesson));
  }
  updateLesson(lesson: Lesson) {
    this.route.navigate([`courses/${this.courseId}/lessons/edit/${lesson.id}`]);
  }
  lessonId!:number;
  courseId!: number;
  lessons!: Lesson[]
  constructor(private router: ActivatedRoute,
    private route: Router,
    private lessonService: LessonService,
    public authService: AuthenticationService,
  ) {
    console.log("in display course constructor");
    this.router.params.subscribe(params => {
      this.courseId = +params['courseId'];
      this.lessonId=+params['id'];
      this.lessonService.getAllLessons(this.courseId).subscribe(data=>this.lessons=data);

    });
  }


}
