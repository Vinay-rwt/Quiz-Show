import { Routes } from '@angular/router';
import { guestOnlyGuard } from '../core/guards/guest-only.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: '⚡ Quiz Show',
    loadComponent: () =>
      import('../features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'difficulty',
    title: 'Choose Difficulty | Quiz Show',
    loadComponent: () =>
      import('../features/difficulty/difficulty.component').then((m) => m.DifficultyComponent),
  },
  {
    path: 'quiz',
    title: 'Quiz | Quiz Show',
    loadComponent: () =>
      import('../features/quiz/quiz.component').then((m) => m.QuizComponent),
  },
  {
    path: 'results',
    title: 'Results | Quiz Show',
    loadComponent: () =>
      import('../features/results/results.component').then((m) => m.ResultsComponent),
  },
  {
    path: 'login',
    title: 'Sign In | Quiz Show',
    canActivate: [guestOnlyGuard],
    loadComponent: () =>
      import('../features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    title: 'Sign Up | Quiz Show',
    canActivate: [guestOnlyGuard],
    loadComponent: () =>
      import('../features/auth/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'analytics',
    title: 'Analytics | Quiz Show',
    // No guard — guests can view their localStorage stats here.
    // The component branches on auth.isAuthenticated() to fetch API vs localStorage.
    loadComponent: () =>
      import('../features/analytics/analytics.component').then((m) => m.AnalyticsComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
