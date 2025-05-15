import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sideBarFechada = signal<boolean>(true);

  constructor(public router: Router, private host: ElementRef<HTMLElement>) {}

  controleSideBar() {
    this.sideBarFechada.set(!this.sideBarFechada());
  }

  @HostListener('document:click', ['$event.target'])
  onclick(target: HTMLElement) {
    if (!this.host.nativeElement.contains(target)) {
      this.sideBarFechada.set(true);
    }
  }
}
