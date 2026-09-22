import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Correo y contraseña son obligatorios.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // AuthService.login ya guarda el token en localStorage internamente (ver el "tap").
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Correo o contraseña incorrectos.';
      },
    });
  }
}
