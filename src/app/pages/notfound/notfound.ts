import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './notfound.html',
  styleUrls: ['./notfound.scss'],
})
export class NotFound {
  constructor(private router: Router) {}

  voltarInicio() {
    this.router.navigate(['/LandingPage']);
  }
}
