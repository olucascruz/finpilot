import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  showPassword = false;
  formLogin = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')

  });

  sendCredentials(){
    const nameValue = this.formLogin.get('name')?.value;
    const emailValue = this.formLogin.get('email')?.value;
    const passwordValue = this.formLogin.get('password')?.value;
    const confirmPasswordValue = this.formLogin.get('confirmPassword')?.value;


    console.log(nameValue, passwordValue);
  }
}
