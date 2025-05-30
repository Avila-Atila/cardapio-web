import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { validatePassword } from '@angular/fire/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    name: new FormControl(''),
    address: new FormControl(''),
    tel: new FormControl(''),
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  authService = inject(AuthService);

  register() {
    if (this.registerForm.invalid) return;

    this.registerForm.disable();

    this.authService
      .register(
        this.registerForm.value.email!,
        this.registerForm.value.password!,
        this.registerForm.value.name!,
        this.registerForm.value.address!,
        this.registerForm.value.tel!
      )
      .subscribe({
        next: () => {
          this.authService
            .login(
              this.registerForm.value.email!,
              this.registerForm.value.password!
            )
            .subscribe({
              next: () =>
                document.getElementById('register__form__close')?.click(),
              error: (err) => alert(err),
            });
        },
        error: (err) => {
          alert(`Erro: ${err}`);
          this.registerForm.enable();
        },
      });
  }
  login() {
    if (this.loginForm.invalid) return;

    this.authService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe({
        next: () => {
          document.getElementById('login__form__close')?.click();
        },
        error: (err) => alert(err),
      });
  }

  logout() {
    this.authService.logout();
  }
}
