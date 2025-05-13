import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { DisplayComponent } from '../../components/display/display.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, DisplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
