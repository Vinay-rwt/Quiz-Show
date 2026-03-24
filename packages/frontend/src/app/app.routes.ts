import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { guestOnlyGuard } from '../core/guards/guest-only.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'difficulty',
    loadComponent: () =>
      import('../features/difficulty/difficulty.component').then((m) => m.DifficultyComponent),
  },
  {
    path: 'quiz',
    loadComponent: () =>
      import('../features/quiz/quiz.component').then((m) => m.QuizComponent),
  },
  {
    path: 'results',
    loadComponent: () =>
      import('../features/results/results.component').then((m) => m.ResultsComponent),
  },
  {
    path: 'login',
    canActivate: [guestOnlyGuard],
    loadComponent: () =>
      import('../features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    canActivate: [guestOnlyGuard],
    loadComponent: () =>
      import('../features/auth/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'analytics',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../features/analytics/analytics.component').then((m) => m.AnalyticsComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
