import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Pratos } from '../../models/pratos.interface';
import { PratosFirebaseService } from '../../services/pratos-firebase.service';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-current-dishes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './current-dishes.component.html',
  styleUrl: './current-dishes.component.css',
})
export class CurrentDishesComponent {
  ngOnInit(): void {
    this.requestService.getPratos().subscribe((resp) => {
      this.pratos.set(resp);
    });
  }
  @Output() edit = new EventEmitter<Pratos>();
  @Output() delete = new EventEmitter<Pratos>();
  requestService = inject(PratosFirebaseService);

  deleteDish(id: string) {
    this.requestService
      .deletePrato(id)
      .then(() => console.log('deletado'))
      .catch((err) => console.error('erro:', err));
  }

  private destroy$ = new Subject<void>();
  pratos = signal<Pratos[] | null>(null);

  // onSubmitPartial(id: string) {
  //   if (this.editDish.pristine) return;

  //   const changes: Partial<Pratos> = {};

  //   Object.entries(this.editDish.controls).forEach(([key, ctrl]) => {
  //     if (ctrl.dirty) {
  //       if (key !== 'ingredientes') {
  //         changes[key as keyof Pratos] = ctrl.value as any;
  //       }
  //     }
  //   });

  //   const ingArray = this.ingredientesArray;
  //   if (ingArray.dirty) {
  //     const newIngs = ingArray.controls
  //       .map((c, idx) => (c.dirty ? c.value : undefined))
  //       .filter((v) => typeof v === 'string') as string[];
  //     if (newIngs.length) {
  //       changes.ingredientes = newIngs;
  //     }
  //   }

  //   if (Object.keys(changes).length === 0) {
  //     return;
  //   }

  //   const pratoDoc = doc(this.requestService.firestore, `pratos/${id}`);
  //   updateDoc(pratoDoc, changes)
  //     .then(() => {
  //       console.log('Atualizado:', changes);
  //       this.editDish.reset();
  //     })
  //     .catch((err) => console.error(err));
  // }

  // openEditModal(prato: Pratos, modalId: string) {
  //   this.editDish.reset();
  //   this.ingredientesArray.clear();

  //   prato.ingredientes.forEach(() => this.addIngredient());

  //   new (window as any).bootstrap.Modal(
  //     document.getElementById(modalId)!
  //   ).show();
  // }

  onEditClick(prato: Pratos) {
    this.edit.emit(prato);
  }
  onDeleteClick(prato: Pratos) {
    this.delete.emit(prato);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
