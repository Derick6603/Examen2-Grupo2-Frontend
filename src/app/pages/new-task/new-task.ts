import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTaskComponent {
  title: string = '';
  priorityLevel: number = 1;
  notes: string = '';

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (!this.title.trim()) {
      this.errorMessage = 'El título es obligatorio.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.taskService
      .create({ title: this.title, priorityLevel: this.priorityLevel, notes: this.notes || null })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'No se pudo guardar la tarea.';
        },
      });
  }
}
