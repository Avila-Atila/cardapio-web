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

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
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
        next: () => console.log('User registered!'),
        error: (err) => {
          alert(`Erro: ${err}`);
          this.registerForm.enable();
        },
      });
  }
  login() {
    console.log(this.loginForm.value);
  }
}
