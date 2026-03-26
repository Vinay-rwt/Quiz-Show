import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { NeonButtonComponent } from '../../shared/components/neon-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink, NeonButtonComponent],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4"
         style="background-color: var(--bg-dark)">
      <div class="w-full max-w-sm animate-slide-in">

        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-black tracking-widest uppercase glow-cyan mb-2"
              style="color: var(--neon-cyan)">Sign In</h1>
          <p class="text-sm" style="color: var(--text-dim)">Welcome back, contestant</p>
        </div>

        <!-- Form -->
        <form (ngSubmit)="onSubmit()" novalidate class="space-y-4">

          <!-- Email -->
          <div>
            <label class="block text-xs font-semibold tracking-widest uppercase mb-2"
                   style="color: var(--text-dim)">Email</label>
            <input
              type="email"
              name="email"
              [(ngModel)]="email"
              required
              autocomplete="email"
              placeholder="you@example.com"
              class="neon-input w-full"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-xs font-semibold tracking-widest uppercase mb-2"
                   style="color: var(--text-dim)">Password</label>
            <input
              type="password"
              name="password"
              [(ngModel)]="password"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="neon-input w-full"
            />
          </div>

          <!-- Error -->
          <p *ngIf="errorMsg()" class="text-sm text-red-400 text-center">
            {{ errorMsg() }}
          </p>

          <!-- Submit -->
          <app-neon-button
            type="submit"
            variant="cyan"
            [disabled]="auth.isLoading() || !email || !password"
            class="w-full block"
          >
            {{ auth.isLoading() ? 'Signing in…' : 'Sign In' }}
          </app-neon-button>

        </form>

        <!-- Footer links -->
        <p class="text-center mt-6 text-sm" style="color: var(--text-dim)">
          No account?
          <a routerLink="/signup" style="color: var(--neon-cyan)"
             class="font-semibold hover:underline ml-1">Create one</a>
        </p>
        <p class="text-center mt-3">
          <a routerLink="/home" class="text-xs hover:underline"
             style="color: var(--text-dim)">← Back to home</a>
        </p>

      </div>
    </div>
  `,
  styles: [`
    .neon-input {
      background: var(--bg-card, #0d1117);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px;
      padding: 10px 14px;
      color: #f0f6fc;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .neon-input::placeholder { color: rgba(240,246,252,0.3); }
    .neon-input:focus {
      border-color: var(--neon-cyan);
      box-shadow: 0 0 12px rgba(0,245,255,0.2);
    }
    app-neon-button { display: block; }
    app-neon-button button { width: 100%; }
  `],
})
export class LoginComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  email = '';
  password = '';
  readonly errorMsg = signal('');

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) return;
    this.errorMsg.set('');
    try {
      await this.auth.login(this.email, this.password);
      // Redirect to the page the guard originally blocked, or fall back to home.
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/home';
      this.router.navigateByUrl(returnUrl);
    } catch {
      this.errorMsg.set('Invalid email or password. Please try again.');
    }
  }
}
