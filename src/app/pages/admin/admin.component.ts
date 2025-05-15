import { Component } from '@angular/core';
import { DisplayComponent } from '../../components/display/display.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  imports: [DisplayComponent, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {}
