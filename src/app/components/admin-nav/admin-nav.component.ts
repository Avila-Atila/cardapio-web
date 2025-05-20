import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  imports: [RouterLink],
  templateUrl: './admin-nav.component.html',
  styleUrl: './admin-nav.component.css',
})
export class AdminNavComponent {
  constructor(protected router: Router) {}
}
