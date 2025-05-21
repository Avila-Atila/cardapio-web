import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Pratos } from '../../models/pratos.interface';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CurrentDishesComponent } from '../current-dishes/current-dishes.component';
import { AddDishFormComponent } from '../add-dish-form/add-dish-form.component';

@Component({
  selector: 'app-display',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrentDishesComponent,
    AddDishFormComponent,
  ],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent {}
