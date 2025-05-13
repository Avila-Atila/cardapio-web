import { Component } from '@angular/core';
import { DisplayComponent } from '../../components/display/display.component';

@Component({
  selector: 'app-admin',
  imports: [DisplayComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {}
