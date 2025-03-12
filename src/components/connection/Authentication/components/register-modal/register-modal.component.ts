import { Component, Input } from '@angular/core';
import { User } from '../../../../../models/user';
import { AuthenticationService } from '../../service/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { _MatInternalFormField } from '@angular/material/core';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  imports: [MatButtonModule, FormsModule, ReactiveFormsModule,
    MatDialogModule
  ],
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {
  @Input() isVisible = false;
  // dialogRef: MatDialogRef<RegisterModalComponent>

  user: User = new User(1, '', '', '', '');

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('')
  });
  constructor(
    // private dialogRef: MatDialogRef<RegisterModalComponent>,
    private authenticationService: AuthenticationService,
    private route: Router,
  ) { }

  credentials = { email: '', password: '' };
  onSubmit() {
    console.log("on submit");
    this.user.name = this.registerForm.value.name;
    this.user.email = this.registerForm.value.email;
    this.user.password = this.registerForm.value.password;
    
    this.authenticationService.register(this.user).subscribe(res => {
      console.log(res)
      localStorage.setItem("userId", res.id);
      sessionStorage.setItem("token", res.token);
      this.authenticationService.isLoggedIn = true;
      this.authenticationService.isTeacher = this.user.role == "teacher" ? true : false;
      this.route.navigate(['courses']);
    });
  }

  onCheckboxChange() {
    this.user.role == "teacher" ? this.user.role = "student" : this.user.role = "teacher";
  }

  closeModal(): void {
    // this.dialogRef.close();
  }

}
