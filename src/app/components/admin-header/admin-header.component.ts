import { Component, inject, OnInit, signal } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
})
export class AdminHeaderComponent implements OnInit {
  ngOnInit(): void {
    this.configService.getConfig().subscribe((resp) => {
      this.configId = resp[0].id!;
      this.openState.set(resp[0].aberto);
    });
  }
  authService = inject(AuthService);
  private configId!: string;
  openState = signal<boolean>(false);
  configService = inject(ConfigService);
  updateConfig() {
    const next = !this.openState();
    this.configService
      .updateConfig(this.configId, next)
      .then(() => this.openState.set(next))
      .catch((err) => console.error('Failed to update config:', err));
  }
}
