import { Component, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
  ]
})
export class AppModule { }


@Component({
  selector: 'app-lading-page',
  standalone: true,
  imports: [Navbar,CommonModule,RouterModule],
  templateUrl: './lading-page.html',
  styleUrl: './lading-page.scss'
})
export class LadingPage {
 
}
