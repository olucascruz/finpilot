import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  hide = true;
  showPassword = false;
  formRegister = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')

  });

  sendCredentials(){
    const nameValue = this.formRegister.get('name')?.value;
    const emailValue = this.formRegister.get('email')?.value;
    const passwordValue = this.formRegister.get('password')?.value;
    const confirmPasswordValue = this.formRegister.get('confirmPassword')?.value;


    console.log(nameValue, passwordValue);
  }
}
