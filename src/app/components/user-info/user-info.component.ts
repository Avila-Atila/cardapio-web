import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserInfo } from '@angular/fire/auth';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { UserInfoInterface } from '../../models/user-info.interface';

@Component({
  selector: 'app-user-info',
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  users$: Observable<UserInfoInterface[]>;
  usersService = inject(UsersService);
  constructor() {
    this.users$ = this.usersService.getAllUsers();
  }
}
