import { Component, inject } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { AuthService } from '../../services/auth.service';
import { CartComponent } from '../cart/cart.component';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-header',
  imports: [ProfileComponent, CartComponent, OrdersComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authService = inject(AuthService);
}
