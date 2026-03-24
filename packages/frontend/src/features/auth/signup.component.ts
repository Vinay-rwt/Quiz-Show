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
  template: `
    <div class="min-h-screen flex items-center justify-center px-4"
         style="background-color: var(--bg-dark)">
      <div class="w-full max-w-sm animate-slide-in">

        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-black tracking-widest uppercase mb-2"
              style="color: var(--neon-purple); text-shadow: 0 0 20px var(--neon-purple)">
            Join the Show
          </h1>
          <p class="text-sm" style="color: var(--text-dim)">Create your contestant profile</p>
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

          <!-- Username -->
          <div>
            <label class="block text-xs font-semibold tracking-widest uppercase mb-2"
                   style="color: var(--text-dim)">Username</label>
            <input
              type="text"
              name="username"
              [(ngModel)]="username"
              required
              autocomplete="username"
              placeholder="YourHandleHere"
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
              minlength="8"
              autocomplete="new-password"
              placeholder="Min. 8 characters"
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
            variant="purple"
            [disabled]="auth.isLoading() || !email || !username || !password"
            class="w-full block"
          >
            {{ auth.isLoading() ? 'Creating account…' : 'Create Account' }}
          </app-neon-button>

        </form>

        <!-- Footer links -->
        <p class="text-center mt-6 text-sm" style="color: var(--text-dim)">
          Already have an account?
          <a routerLink="/login" style="color: var(--neon-cyan)"
             class="font-semibold hover:underline ml-1">Sign in</a>
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
      border-color: var(--neon-purple);
      box-shadow: 0 0 12px rgba(157,0,255,0.2);
    }
    app-neon-button { display: block; }
    app-neon-button button { width: 100%; }
  `],
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
      // Backend returns a generic conflict message — display it directly
      // so we don't leak which specific field (email/username) already exists.
      const httpErr = err as { error?: { error?: string } };
      const msg = httpErr?.error?.error ?? '';
      this.errorMsg.set(
        msg || 'Registration failed. Please try again.',
      );
    }
  }
}
