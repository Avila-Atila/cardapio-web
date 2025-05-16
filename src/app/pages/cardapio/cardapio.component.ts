import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DisplayComponent } from '../../components/display/display.component';

@Component({
  selector: 'app-cardapio',
  imports: [SidebarComponent, DisplayComponent],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css',
})
export class CardapioComponent {}
