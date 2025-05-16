import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Pratos } from '../../models/pratos.interface';
import { CommonModule } from '@angular/common';
import { PratosFirebaseService } from '../../services/pratos-firebase.service';

@Component({
  selector: 'app-add-dish-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-dish-form.component.html',
  styleUrl: './add-dish-form.component.css',
})
export class AddDishFormComponent {
  requestService = inject(PratosFirebaseService);
  adicionarPrato = new FormGroup({
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
    return this.adicionarPrato.get('ingredientes') as FormArray<
      FormControl<string>
    >;
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

  teste(info: FormGroup) {
    let novoPrato: Pratos = {
      nome: info.get('nome')!.value,
      preco: info.get('preco')!.value,
      disponivel: info.get('disponivel')!.value,
      ingredientes: info.get('ingredientes')!.value,
    };
    this.requestService
      .addPrato(novoPrato)
      .then((docRef) => console.log('adicionado:', docRef.id))
      .catch((error) => console.error('erro:', error));
  }
}
