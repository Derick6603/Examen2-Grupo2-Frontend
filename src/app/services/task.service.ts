import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CreateTaskRequest, TaskItem } from '../Models/task.models';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:5000/api/Task';

  private tasksSignal = signal<TaskItem[]>([]);
  readonly tasks = this.tasksSignal.asReadonly();

  /** GET /api/Task — carga las tareas del usuario autenticado */
  loadTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl).pipe(
      tap(tasks => this.tasksSignal.set(tasks))
    );
  }

  /** POST /api/Task — crea una tarea nueva */
  createTask(payload: CreateTaskRequest): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, payload).pipe(
      tap(created => this.tasksSignal.update(list => [created, ...list]))
    );
  }

  /** DELETE /api/Task/{id} — elimina y quita de la vista sin recargar */
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.tasksSignal.update(list => list.filter(t => t.id !== id)))
    );
  }

  /** Útil por si necesitas limpiar al cerrar sesión */
  clear(): void {
    this.tasksSignal.set([]);
  }
}
