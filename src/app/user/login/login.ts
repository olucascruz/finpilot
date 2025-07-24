import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Navbar } from '../../pages/navbar/navbar';
import { Router } from '@angular/router';

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

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(false)
  });

  sendCredentials() {
    if (this.formLogin.valid) {
      console.log('Dados enviados:', this.formLogin.value);
      this.router.navigate(['/dashboard']);
    } else {
      this.formLogin.markAllAsTouched();
    }
  }


  constructor(private router: Router) { }

  irParaDashboard() {
    this.router.navigate(['/dashboard']);
  }

}

