import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Navbar } from '../../pages/navbar/navbar';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    Navbar
  ]
})

export class Login {
  hide = true;

  constructor(private router: Router,private loginService:LoginService, private fb: FormBuilder) { }

  formLogin!: FormGroup;
  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }



  irParaDashboard() {
    this.router.navigate(['/dashboard']);
  }

  login() {
    if (this.formLogin.valid) {
      console.log('Dados enviados:', this.formLogin.value);
      // this.router.navigate(['/dashboard']);
    } else {
      this.formLogin.markAllAsTouched();
    }
    
  
    const formData = new FormData();
    formData.append('email', this.formLogin.value.email || '');
    formData.append('password', this.formLogin.value.senha || '');
      this.loginService.login(formData).subscribe({
        next:(response) => {
          localStorage.setItem("accessToken", response.access_token);
        },
        error:(e) => console.error(e),
        complete:() => {
          if(localStorage.getItem("accessToken") != null){
            window.location.href = "/home"
          }
        }
      });
    }


}

