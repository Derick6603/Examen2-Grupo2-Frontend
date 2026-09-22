import { Component, OnInit, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { TaskItem } from '../../Models/task.models';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink, DatePipe, MatButtonModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class TasksComponent implements OnInit {
  // El TaskService ya mantiene la lista como signal y la actualiza solo
  // en cada create/delete (ver el "tap" dentro del servicio), así que la
  // leemos directo de ahí en vez de duplicar el estado en el componente.
  readonly tasks: Signal<TaskItem[]>;

  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.tasks = this.taskService.tasks;
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.loadTasks().subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las tareas.';
        this.isLoading = false;
      },
    });
  }

  onDelete(task: TaskItem): void {
    // No hace falta filtrar el array a mano: TaskService.deleteTask()
    // ya actualiza el signal internamente cuando el DELETE responde bien.
    this.taskService.deleteTask(task.id).subscribe({
      error: () => {
        this.errorMessage = 'No se pudo eliminar la tarea.';
      },
    });
  }

  onLogout(): void {
    // AuthService.logout() ya navega a /login internamente.
    this.authService.logout();
  }
}
