import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Pratos } from '../../models/pratos.interface';
import { CommonModule } from '@angular/common';
import { PratosFirebaseService } from '../../services/pratos-firebase.service';
import { Subject } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-display',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent implements OnInit, OnDestroy {
  requestService = inject(PratosFirebaseService);
  ngOnInit(): void {
    this.requestService.getPratos().subscribe((resp) => {
      this.pratos.set(resp);
    });
  }

  private destroy$ = new Subject<void>();
  pratos = signal<Pratos[] | null>(null);

  mostrar() {
    console.log(this.pratos());
  }

  novoPrato = new FormGroup({
    nome: new FormControl(''),
    preco: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.01)],
    }),
    disponivel: new FormControl<boolean>(false),
    ingredientes: new FormControl<string[]>([]),
  });

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

  teste2(id: string) {
    this.requestService
      .deletePrato(id)
      .then(() => console.log('deletado'))
      .catch((err) => console.error('erro:', err));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
