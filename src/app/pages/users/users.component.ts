import { Component } from '@angular/core';
import { AdminNavComponent } from '../../components/admin-nav/admin-nav.component';
import { UserInfoComponent } from '../../components/user-info/user-info.component';
import { AdminHeaderComponent } from '../../components/admin-header/admin-header.component';

@Component({
  selector: 'app-users',
  imports: [AdminNavComponent, UserInfoComponent, AdminHeaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {}
