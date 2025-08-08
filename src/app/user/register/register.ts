import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Navbar } from '../../pages/navbar/navbar';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, Navbar],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  hide = true;
  showPassword = false;
  formRegister!: FormGroup;

  constructor(private router: Router,private loginService:LoginService, private fb: FormBuilder) { }
  ngOnInit() {
    this.formRegister = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  sendCredentials(){
    if (this.formRegister.valid) {
      console.log('Dados enviados:', this.formRegister.value);
      this.router.navigate(['/login']);
    } else {
      this.formRegister.markAllAsTouched();
    }
    
    const formData = new FormData();
    formData.append('name', this.formRegister.value.name || '');
    formData.append('email', this.formRegister.value.email || '');
    formData.append('password', this.formRegister.value.password || '');
    formData.append('confirm_password', this.formRegister.value.confirmPassword || '');

    this.loginService.register(formData).subscribe({
      next: (response) => {
        console.log('Registro bem-sucedido:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao registrar:', error);
      }
    });
  } 
}
