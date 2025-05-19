import { Component } from '@angular/core';
import { AddDishFormComponent } from '../../components/add-dish-form/add-dish-form.component';
import { CurrentDishesComponent } from '../../components/current-dishes/current-dishes.component';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pratos } from '../../models/pratos.interface';

@Component({
  selector: 'app-cardapio',
  imports: [
    AddDishFormComponent,
    CurrentDishesComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css',
})
export class CardapioComponent {
  editDish = new FormGroup({
    nome: new FormControl(''),
    preco: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.01)],
    }),
    disponivel: new FormControl<boolean>(true),
    ingredientes: new FormArray<FormControl<string>>([
      new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
    ]),
  });

  get ingredientesArray() {
    return this.editDish.get('ingredientes') as FormArray<FormControl<string>>;
  }

  addIngredient() {
    this.ingredientesArray.push(
      new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      })
    );
  }

  removeIngredient(index: number) {
    this.ingredientesArray.removeAt(index);
  }
  openEditModal(event: Pratos) {
    this.editDish.reset();
    this.editDish.setValue({
      nome: event.nome,
      preco: event.preco,
      disponivel: event.disponivel,
      ingredientes: event.ingredientes,
    });
  }
}
