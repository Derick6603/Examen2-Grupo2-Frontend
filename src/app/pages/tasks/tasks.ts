import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Task } from '../../models';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink, DatePipe, MatButtonModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las tareas.';
        this.isLoading = false;
      },
    });
  }

  onDelete(task: Task): void {
    this.taskService.delete(task.id).subscribe({
      next: () => {
        // La quitamos de la vista sin recargar, tal como pide el enunciado
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      error: () => {
        this.errorMessage = 'No se pudo eliminar la tarea.';
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
