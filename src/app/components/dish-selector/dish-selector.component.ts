/* dish-selector.component.ts */
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface SizeConfig {
  slices: number;
  maxFlavors: number;
}

@Component({
  selector: 'app-dish-selector',
  templateUrl: './dish-selector.component.html',
  styleUrls: ['./dish-selector.component.css'],
  imports: [CommonModule],
})
export class DishSelectorComponent {
  @Input() size: 'medium' | 'large' | 'family' = 'medium';

  // determine display text
  get title() {
    return this.size === 'medium'
      ? 'Pizza Média'
      : this.size === 'large'
      ? 'Pizza Grande'
      : 'Pizza família';
  }

  // number of slices (optional, if you want to show it)
  get slices() {
    return this.size === 'medium' ? 6 : this.size === 'large' ? 9 : 12;
  }

  // max flavors per size
  get maxFlavors() {
    return this.size === 'medium' ? 2 : this.size === 'large' ? 3 : 4;
  }

  // price per size
  get price() {
    return this.size === 'medium' ? 32 : this.size === 'large' ? 40 : 48;
  }

  // for the icon color/scale you can also use size
  get iconClass() {
    return {
      medium: 'text-primary',
      large: 'text-warning',
      family: 'text-danger',
    }[this.size];
  }

  // flavor data
  flavors = [
    {
      name: 'Margherita',
      desc: 'Molho de tomate, mussarela, manjericão e azeite.',
    },
    { name: 'Pepperoni', desc: 'Molho de tomate, mussarela e pepperoni.' },
    {
      name: 'Calabresa',
      desc: 'Molho de tomate, mussarela, calabresa e cebola.',
    },
    {
      name: 'Quatro Queijos',
      desc: 'Molho de tomate, mussarela, provolone, parmesão, gorgonzola.',
    },
    {
      name: 'Portuguesa',
      desc: 'Molho de tomate, mussarela, presunto, ovos, cebola, azeitonas.',
    },
  ];

  counts: Record<string, number> = {};
  totalSelected = 0;

  inc(flavor: string) {
    if (this.totalSelected < this.maxFlavors) {
      this.counts[flavor] = (this.counts[flavor] || 0) + 1;
      this.totalSelected++;
    }
  }

  dec(flavor: string) {
    if ((this.counts[flavor] || 0) > 0) {
      this.counts[flavor]!--;
      this.totalSelected--;
    }
  }
}

/* dish-selector.component.html */
