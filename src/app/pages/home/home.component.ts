import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { DishSelectorComponent } from '../../components/dish-selector/dish-selector.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, DishSelectorComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
