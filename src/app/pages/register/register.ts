import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (!this.fullName.trim() || !this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService
      .register({ fullName: this.fullName, email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Cuenta creada. Redirigiendo al login...';

          // Pequeña pausa para que el usuario alcance a leer el mensaje
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'No se pudo crear la cuenta.';
        },
      });
  }
}
