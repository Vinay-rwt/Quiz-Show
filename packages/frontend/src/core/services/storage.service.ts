import { Injectable } from '@angular/core';
import type { QuizAttempt } from '@quizapp/shared';

const GUEST_ATTEMPTS_KEY = 'quizapp_guest_attempts';
const MAX_GUEST_ATTEMPTS = 20;

// Wraps localStorage for guest quiz history.
// Authenticated users have their history in the DB via /api/analytics/me.
// Guests get a local record capped at 20 attempts to prevent unbounded storage growth.
@Injectable({ providedIn: 'root' })
export class StorageService {
  getGuestAttempts(): QuizAttempt[] {
    try {
      const raw = localStorage.getItem(GUEST_ATTEMPTS_KEY);
      return raw ? (JSON.parse(raw) as QuizAttempt[]) : [];
    } catch {
      return [];
    }
  }

  saveGuestAttempt(attempt: QuizAttempt): void {
    const attempts = this.getGuestAttempts();
    attempts.unshift(attempt); // newest first
    // Keep only the most recent MAX_GUEST_ATTEMPTS
    const trimmed = attempts.slice(0, MAX_GUEST_ATTEMPTS);
    localStorage.setItem(GUEST_ATTEMPTS_KEY, JSON.stringify(trimmed));
  }

  clearGuestAttempts(): void {
    localStorage.removeItem(GUEST_ATTEMPTS_KEY);
  }
}
