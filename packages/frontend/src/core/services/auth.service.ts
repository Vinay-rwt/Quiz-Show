import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import type { AuthUser } from '@quizapp/shared';

interface AuthResponse {
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // inject() in class field initializers — Angular 14+ idiomatic pattern.
  // No constructor injection boilerplate needed.
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  // Signal-based auth state — reactive across entire app, zero NgRx needed.
  readonly currentUser = signal<AuthUser | null>(null);
  readonly isLoading = signal(false);

  // Derived signal: components check isAuthenticated() instead of null-checking currentUser
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  // Called by APP_INITIALIZER on boot. Blocks first render until the cookie
  // check resolves, so guards always have accurate auth state on first navigation.
  async checkSession(): Promise<void> {
    try {
      const res = await firstValueFrom(
        this.http.get<{ user: AuthUser | null }>('/api/auth/me'),
      );
      this.currentUser.set(res.user);
    } catch {
      this.currentUser.set(null);
    }
  }

  async login(email: string, password: string): Promise<void> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>('/api/auth/login', { email, password }),
      );
      this.currentUser.set(res.user);
    } finally {
      this.isLoading.set(false);
    }
  }

  async register(email: string, username: string, password: string): Promise<void> {
    this.isLoading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<AuthResponse>('/api/auth/register', { email, username, password }),
      );
      this.currentUser.set(res.user);
    } finally {
      this.isLoading.set(false);
    }
  }

  async logout(): Promise<void> {
    await firstValueFrom(this.http.post('/api/auth/logout', {}));
    this.currentUser.set(null);
    this.router.navigate(['/home']);
  }
}
