import { Component, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
  ]
})
export class AppModule { }


@Component({
  selector: 'app-lading-page',
  imports: [],
  templateUrl: './lading-page.html',
  styleUrl: './lading-page.scss'
})
export class LadingPage {
  isMenuOpen = false;

}
