import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  showPassword = false;
  formLogin = new FormGroup({
    username: new FormControl(''),
  });
  hide = true;
  sendCredentials(){
    const nameValue = this.formLogin.get('username')?.value;
    const passwordValue = this.formLogin.get('password')?.value;

    console.log(nameValue, passwordValue);
  }
}
