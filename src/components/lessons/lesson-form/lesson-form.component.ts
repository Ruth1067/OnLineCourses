import { Component } from '@angular/core';
import { Lesson } from '../../../models/lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../service/lessons.service';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-form',
  imports: [ReactiveFormsModule,
    FormsModule,
],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css'
})
export class LessonFormComponent {
  lessonId: number = 0;
  courseId!: number;
  lesson!: Lesson

  constructor(private route: Router, private lessonService: LessonService, private router: ActivatedRoute, private lesssonService: LessonService) {

    // Subscribe to route parameters
    this.router.params.subscribe(params => {
      this.lessonId = +params['id'];
      this.courseId = +params['courseId'];

      
      if (this.lessonId > 0) {
        console.log(this.lessonId);
        lessonService.getLessonById(this.lessonId).subscribe((data: Lesson) => {
          this.lesson = data;
          this.lesson = data
          this.populateForm({ title: this.lesson.title, content: this.lesson.content });
        });
      }
    });



  }
/******  5045c8f6-273f-4f23-8255-a9c944aec4b8  *******/
  closeModal() {
    throw new Error('Method not implemented.');
  }
  


  onSubmit() {
    if (this.lessonForm.invalid) {
      console.log("Form is invalid");
      return;
    }
  
    const lessonData ={ ...this.lessonForm.value, courseId: this.courseId };
  
    if (this.lessonId > 0) {
      this.lessonService.updateLesson(this.lessonId, lessonData,this.courseId).subscribe({
        next: (data) => {
          console.log("Lesson updated:", data);
          console.log(data.content);
          this.route.navigate(['../../'], { relativeTo: this.router });
        },
        error: (err) => console.error("Error updating lesson:", err)
      });
    } else {
      this.lessonService.createLesson(lessonData).subscribe({
        next: (data) => {
          console.log("Lesson created:", data);
          this.route.navigate(['../'], { relativeTo: this.router });
        },
        error: (err) => console.error("Error creating lesson:", err)
      });
    }
  }
  
  lessonForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });


  populateForm(data: any) {
    Object.keys(data).forEach(key => {
      if (this.lessonForm.controls[key]) {
        this.lessonForm.controls[key].setValue(data[key]);
      }
    });
  }
}
