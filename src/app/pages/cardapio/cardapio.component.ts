import { Component, inject } from '@angular/core';
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
import { PratosFirebaseService } from '../../services/pratos-firebase.service';
import { AdminNavComponent } from '../../components/admin-nav/admin-nav.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';

@Component({
  selector: 'app-cardapio',
  imports: [
    AddDishFormComponent,
    CurrentDishesComponent,
    ReactiveFormsModule,
    CommonModule,
    AdminNavComponent,
    AdminHeaderComponent,
  ],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css',
})
export class CardapioComponent {
  editDish = new FormGroup({
    id: new FormControl<string>('', { nonNullable: true }),
    nome: new FormControl('', Validators.required),
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
  requestService = inject(PratosFirebaseService);
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
    this.ingredientesArray.controls.forEach((element, i) => {
      this.removeIngredient(i);
    });

    event.ingredientes.forEach((element, i) => {
      if (!this.ingredientesArray.controls[i]) {
        this.addIngredient();
      } else {
        return;
      }
    });
    this.editDish.get('id')!.setValue(event.id!);
    this.editDish.patchValue({
      nome: event.nome,
      preco: event.preco,
      disponivel: event.disponivel,
      ingredientes: event.ingredientes,
    });
  }

  sendEditDish() {
    this.requestService.updatePrato(this.editDish.value as Pratos);
  }

  selectedDish: Pratos | null = null;
  openDeleteModal(event: Pratos) {
    this.selectedDish = event;
  }

  deleteDish() {
    this.requestService
      .deletePrato(this.selectedDish!.id!)
      .then(() => console.log('deletado'))
      .catch((err) => alert(`Erro: ${err}`));
  }
}
