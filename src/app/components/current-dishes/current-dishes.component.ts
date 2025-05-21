import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Pratos } from '../../models/pratos.interface';
import { PratosFirebaseService } from '../../services/pratos-firebase.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
