import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  showPassword = false;
  formLogin = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  sendCredentials(){
    const nameValue = this.formLogin.get('username')?.value;
    const passwordValue = this.formLogin.get('password')?.value;

    console.log(nameValue, passwordValue);
  }
}
