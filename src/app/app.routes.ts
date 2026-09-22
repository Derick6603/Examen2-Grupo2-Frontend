import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';
import { TasksComponent } from './pages/tasks/tasks';
import { NewTaskComponent } from './pages/new-task/new-task';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // Pantalla principal - protegida con Auth Guard
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard] },

  // Ruta separada para la nueva tarea, también protegida
  { path: 'new-task', component: NewTaskComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '/login' },
];
