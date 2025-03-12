

import { MatButtonModule } from '@angular/material/button';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports:[MatButtonModule, LoginModalComponent, RegisterModalComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginModalVisible :boolean= false;
  isRegisterModalVisible : boolean= false;
  openLoginModal() {
    console.log("in login modal");
    this.isLoginModalVisible = true;
  }
  openRegisterModal() {
    this.isRegisterModalVisible=true;
      }
}