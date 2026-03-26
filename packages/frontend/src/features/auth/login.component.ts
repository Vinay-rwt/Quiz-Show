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
  styles: [`
    .page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      background-color: var(--bg-dark);
    }
    .card {
      width: 100%;
      max-width: 360px;
      animation: slide-in-up .4s cubic-bezier(.16,1,.3,1) forwards;
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .title {
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: 1.75rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--neon-cyan);
      text-shadow: 0 0 20px var(--neon-cyan);
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 0.875rem;
      color: var(--text-dim);
    }
    .form { display: flex; flex-direction: column; gap: 16px; }
    .field { display: flex; flex-direction: column; gap: 8px; }
    .field-label {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-dim);
    }
    .neon-input {
      width: 100%;
      background: var(--bg-card);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px;
      padding: 10px 14px;
      color: #f0f6fc;
      font-size: 0.9rem;
      outline: none;
      transition: border-color .2s, box-shadow .2s;
      box-sizing: border-box;
    }
    .neon-input::placeholder { color: rgba(240,246,252,0.3); }
    .neon-input:focus {
      border-color: var(--neon-cyan);
      box-shadow: 0 0 12px rgba(0,245,255,0.2);
    }
    .error-msg {
      font-size: 0.875rem;
      color: #f87171;
      text-align: center;
    }
    app-neon-button { display: block; }
    app-neon-button button { width: 100%; }
    .footer {
      text-align: center;
      margin-top: 24px;
      font-size: 0.875rem;
      color: var(--text-dim);
    }
    .footer-link {
      color: var(--neon-cyan);
      font-weight: 600;
      margin-left: 4px;
      text-decoration: none;
    }
    .footer-link:hover { text-decoration: underline; }
    .back-link {
      display: block;
      text-align: center;
      margin-top: 12px;
      font-size: 0.75rem;
      color: var(--text-dim);
      text-decoration: none;
    }
    .back-link:hover { text-decoration: underline; }
    @keyframes slide-in-up {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
  `],
  template: `
    <div class="page">
      <div class="card">

        <!-- Header -->
        <div class="header">
          <h1 class="title">Sign In</h1>
          <p class="subtitle">Welcome back, contestant</p>
        </div>

        <!-- Form -->
        <form (ngSubmit)="onSubmit()" novalidate class="form">

          <!-- Email -->
          <div class="field">
            <label class="field-label">Email</label>
            <input
              type="email"
              name="email"
              [(ngModel)]="email"
              required
              autocomplete="email"
              placeholder="you@example.com"
              class="neon-input"
            />
          </div>

          <!-- Password -->
          <div class="field">
            <label class="field-label">Password</label>
            <input
              type="password"
              name="password"
              [(ngModel)]="password"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="neon-input"
            />
          </div>

          <!-- Error -->
          <p *ngIf="errorMsg()" class="error-msg">{{ errorMsg() }}</p>

          <!-- Submit -->
          <app-neon-button
            type="submit"
            variant="cyan"
            [disabled]="auth.isLoading() || !email || !password"
          >
            {{ auth.isLoading() ? 'Signing in…' : 'Sign In' }}
          </app-neon-button>

        </form>

        <!-- Footer links -->
        <p class="footer">
          No account?
          <a routerLink="/signup" class="footer-link">Create one</a>
        </p>
        <a routerLink="/home" class="back-link">← Back to home</a>

      </div>
    </div>
  `,
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
