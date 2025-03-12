

// import { Component, inject } from '@angular/core';
// import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { UserService } from '../../../../../services/user.service';
// import { MatFormField } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { AuthenticationService } from '../../service/authentication.service';
// import { MatIcon } from '@angular/material/icon';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-login-modal',
//   templateUrl: './login-modal.component.html',
//   imports: [MatDialogModule, 
//     FormsModule,
//      MatButtonModule,
//     ReactiveFormsModule ],
//   styleUrls: ['./login-modal.component.css']
// })
// export class LoginModalComponent {

//   credentials = { email: '', password: '' };
//   router = inject(Router);
//   constructor(private auhenticationService: AuthenticationService) { }

//   onSubmit = () => {
//     this.auhenticationService.login(this.credentials).subscribe(res => {
//       console.log(res)
//       this.auhenticationService.isTeacher=res.role=="teacher"?true:false;
//       this.auhenticationService.currentUser=res.role;
//       sessionStorage.setItem("token", res.token);
//       this.auhenticationService.isLoggedIn = true;
//       this.router.navigate(['courses']);
//     }, error => {
//       console.log(error);}
//     );
//   }

// }

// login-modal.component.ts

import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { _MatInternalFormField } from '@angular/material/core';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  imports: [
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() isVisible = false;
private dailog=inject(MatDialog)
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  credentials = { email: '', password: '' };
  router = inject(Router);
  // dialogRef: any;
  constructor(private auhenticationService: AuthenticationService) { }
  onSubmit() {
    this.loginForm.value?.email ? this.credentials.email = this.loginForm.value.email : "";
    this.loginForm.value?.password ? this.credentials.password = this.loginForm.value.password : "";
    this.auhenticationService.login(this.credentials).subscribe(res => {
      console.log(res)
      this.auhenticationService.isTeacher = res.role == "teacher" ? true : false;
      sessionStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.id);
      this.auhenticationService.isLoggedIn = true;
      this.router.navigate(['courses']);
    }, error => {
      console.log(error);
    }
    );
  }

  closeModal(): void {
    // this.dailog.close();
  }
}


