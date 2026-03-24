import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { NeonButtonComponent } from '../../shared/components/neon-button.component';

@Component({
  selector: 'app-signup',
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
      color: var(--neon-purple);
      text-shadow: 0 0 20px var(--neon-purple);
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
      border-color: var(--neon-purple);
      box-shadow: 0 0 12px rgba(157,0,255,0.2);
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
          <h1 class="title">Join the Show</h1>
          <p class="subtitle">Create your contestant profile</p>
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

          <!-- Username -->
          <div class="field">
            <label class="field-label">Username</label>
            <input
              type="text"
              name="username"
              [(ngModel)]="username"
              required
              autocomplete="username"
              placeholder="YourHandleHere"
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
              minlength="8"
              autocomplete="new-password"
              placeholder="Min. 8 characters"
              class="neon-input"
            />
          </div>

          <!-- Error -->
          <p *ngIf="errorMsg()" class="error-msg">{{ errorMsg() }}</p>

          <!-- Submit -->
          <app-neon-button
            type="submit"
            variant="purple"
            [disabled]="auth.isLoading() || !email || !username || !password"
          >
            {{ auth.isLoading() ? 'Creating account…' : 'Create Account' }}
          </app-neon-button>

        </form>

        <!-- Footer links -->
        <p class="footer">
          Already have an account?
          <a routerLink="/login" class="footer-link">Sign in</a>
        </p>
        <a routerLink="/home" class="back-link">← Back to home</a>

      </div>
    </div>
  `,
})
export class SignupComponent {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  username = '';
  password = '';
  readonly errorMsg = signal('');

  async onSubmit(): Promise<void> {
    if (!this.email || !this.username || !this.password) return;
    if (this.password.length < 8) {
      this.errorMsg.set('Password must be at least 8 characters.');
      return;
    }
    this.errorMsg.set('');
    try {
      await this.auth.register(this.email, this.username, this.password);
      this.router.navigate(['/home']);
    } catch (err: unknown) {
      const httpErr = err as { error?: { error?: string } };
      const msg = httpErr?.error?.error ?? '';
      this.errorMsg.set(
        msg || 'Registration failed. Please try again.',
      );
    }
  }
}
