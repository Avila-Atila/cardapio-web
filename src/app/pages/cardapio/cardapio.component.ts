import { Component } from '@angular/core';
import { AddDishFormComponent } from '../../components/add-dish-form/add-dish-form.component';
import { CurrentDishesComponent } from '../../components/current-dishes/current-dishes.component';

@Component({
  selector: 'app-cardapio',
  imports: [AddDishFormComponent, CurrentDishesComponent],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css',
})
export class CardapioComponent {}
