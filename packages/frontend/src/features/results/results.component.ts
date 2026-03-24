import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { QuizStateService } from '../../core/services/quiz-state.service';
import { AuthService } from '../../core/services/auth.service';
import { NeonButtonComponent } from '../../shared/components/neon-button.component';

// ─── Score label config ───────────────────────────────────────────────────────

interface ScoreConfig {
  label: string;
  color: string;
}

function getScoreConfig(pct: number): ScoreConfig {
  if (pct === 100) return { label: 'Perfect Score',  color: 'var(--neon-cyan)' };
  if (pct >= 80)   return { label: 'Excellent',      color: 'var(--neon-green)' };
  if (pct >= 60)   return { label: 'Good Job',       color: 'var(--neon-yellow)' };
  if (pct >= 40)   return { label: 'Keep Studying',  color: 'var(--neon-yellow)' };
  return               { label: 'Keep Going',       color: 'var(--neon-red)' };
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [NgIf, NgFor, NeonButtonComponent],
  styles: [`
    /* ── Page ────────────────────────────────────────────────────── */
    .page {
      min-height: 100vh;
      background-color: var(--bg-dark);
      background-image:
        radial-gradient(ellipse at 20% 30%, rgba(0,245,255,0.04) 0%, transparent 55%),
        radial-gradient(ellipse at 80% 70%, rgba(157,0,255,0.03) 0%, transparent 55%);
      padding: 40px 16px 80px;
    }

    /* ── Content wrapper ─────────────────────────────────────────── */
    .results-wrap {
      max-width: 640px;
      margin: 0 auto;
      animation: slide-in-up .4s cubic-bezier(.16,1,.3,1) forwards;
    }

    /* ── Score card ──────────────────────────────────────────────── */
    .score-card {
      background-color: var(--bg-card);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5);
      padding: 32px;
      text-align: center;
      margin-bottom: 32px;
    }

    /* ── Score icon badge ────────────────────────────────────────── */
    .score-icon {
      width: 64px;
      height: 64px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }

    /* ── Score number ────────────────────────────────────────────── */
    .score-number {
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: clamp(3.5rem, 10vw, 4.5rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1;
    }
    .score-total {
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: 1.75rem;
      font-weight: 500;
      color: rgba(240,246,252,0.3);
    }
    .score-number-row { margin-bottom: 8px; }

    /* ── Score labels ─────────────────────────────────────────────── */
    .score-label {
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .score-accuracy {
      font-size: 0.875rem;
      color: var(--text-dim);
    }
    .breadcrumb {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--text-dim);
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      margin-bottom: 12px;
    }

    /* ── Review section ──────────────────────────────────────────── */
    .review-section { margin-bottom: 32px; }
    .section-label {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--text-dim);
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      margin-bottom: 16px;
      padding: 0 4px;
    }
    .review-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* ── Review item ──────────────────────────────────────────────── */
    .review-item {
      background-color: var(--bg-card);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 14px;
      padding: 14px 16px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.3);
      transition: border-color 0.2s ease;
    }
    .review-item.correct { border-color: rgba(57,255,20,0.2); }
    .review-item.wrong   { border-color: rgba(255,7,58,0.2); }

    .review-item-inner {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    .review-icon {
      flex-shrink: 0;
      margin-top: 2px;
    }
    .review-content {
      flex: 1;
      min-width: 0;
    }
    .review-question {
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 6px;
      line-height: 1.4;
      color: rgba(240,246,252,0.9);
    }
    .review-answer {
      font-size: 0.75rem;
      line-height: 1.6;
      color: var(--text-dim);
    }
    .review-explanation {
      font-size: 0.75rem;
      margin-top: 6px;
      line-height: 1.6;
      font-style: italic;
      color: var(--text-dim);
      opacity: 0.8;
    }

    /* ── Guest upsell ─────────────────────────────────────────────── */
    .guest-card {
      background: linear-gradient(135deg, rgba(157,0,255,0.05), rgba(0,245,255,0.03));
      border: 1px solid rgba(157,0,255,0.2);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5);
      padding: 20px;
      text-align: center;
      margin-bottom: 24px;
    }
    .guest-icon {
      display: block;
      margin: 0 auto 12px;
      color: var(--neon-purple);
    }
    .guest-text {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-dim);
      margin-bottom: 12px;
    }

    /* ── Action buttons ──────────────────────────────────────────── */
    .actions-row {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }

    @keyframes slide-in-up {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
  `],
  template: `
    <div class="page">
      <div class="results-wrap">

        <!-- ── Score card ─────────────────────────────────────────────── -->
        <div class="score-card"
             [style.border-color]="scoreConfig.color === 'var(--neon-cyan)'
               ? 'rgba(0,245,255,0.25)'
               : scoreConfig.color === 'var(--neon-green)'
                 ? 'rgba(57,255,20,0.2)'
                 : 'rgba(255,7,58,0.2)'"
        >
          <!-- Score icon -->
          <div class="score-icon"
               [style.background]="scoreConfig.color === 'var(--neon-cyan)'
                 ? 'rgba(0,245,255,0.08)'
                 : scoreConfig.color === 'var(--neon-green)'
                   ? 'rgba(57,255,20,0.08)'
                   : 'rgba(255,215,0,0.08)'"
               [style.border]="'1px solid ' + scoreConfig.color + '33'"
          >
            <!-- Perfect (100%) — Star icon -->
            <svg *ngIf="accuracyPercent === 100"
                 width="32" height="32" viewBox="0 0 24 24" fill="none"
                 style="color: var(--neon-cyan); filter: drop-shadow(0 0 8px var(--neon-cyan))">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                       stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round" fill="rgba(0,245,255,0.15)"/>
            </svg>

            <!-- Excellent (80-99%) — Trophy icon -->
            <svg *ngIf="accuracyPercent >= 80 && accuracyPercent < 100"
                 width="32" height="32" viewBox="0 0 24 24" fill="none"
                 style="color: var(--neon-green); filter: drop-shadow(0 0 8px var(--neon-green))">
              <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M6 9V4h12v5c0 3.31-2.69 6-6 6s-6-2.69-6-6z" stroke="currentColor" stroke-width="2"/>
              <path d="M12 15v4M8 20h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>

            <!-- Good (60-79%) — Thumbs up icon -->
            <svg *ngIf="accuracyPercent >= 60 && accuracyPercent < 80"
                 width="32" height="32" viewBox="0 0 24 24" fill="none"
                 style="color: var(--neon-yellow); filter: drop-shadow(0 0 8px var(--neon-yellow))">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <!-- Needs work (<60%) — Target icon -->
            <svg *ngIf="accuracyPercent < 60"
                 width="32" height="32" viewBox="0 0 24 24" fill="none"
                 style="color: var(--neon-red); filter: drop-shadow(0 0 8px var(--neon-red))">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="12" r="6"  stroke="currentColor" stroke-width="2" stroke-opacity="0.5"/>
              <circle cx="12" cy="12" r="2"  fill="currentColor"/>
            </svg>
          </div>

          <!-- Breadcrumb -->
          <p class="breadcrumb">{{ quizState.selectedTopicName() }} · {{ quizState.selectedDifficulty() }}</p>

          <!-- Score number -->
          <div class="score-number-row">
            <span class="score-number"
                  [style.color]="scoreConfig.color"
                  [style.text-shadow]="'0 0 14px ' + scoreConfig.color + ', 0 0 40px ' + scoreConfig.color + '88'">
              {{ result?.score }}
            </span>
            <span class="score-total">/{{ result?.totalQuestions }}</span>
          </div>

          <!-- Score label -->
          <p class="score-label" [style.color]="scoreConfig.color">{{ scoreConfig.label }}</p>

          <!-- Accuracy -->
          <p class="score-accuracy">{{ accuracyPercent }}% accuracy</p>
        </div>

        <!-- ── Question review ────────────────────────────────────────── -->
        <div class="review-section">
          <h2 class="section-label">Question Review</h2>
          <div class="review-list">
            <div
              *ngFor="let q of quizState.questions(); let i = index"
              class="review-item"
              [class.correct]="isCorrect(i)"
              [class.wrong]="!isCorrect(i)"
            >
              <div class="review-item-inner">
                <!-- SVG status icon -->
                <span class="review-icon">
                  <svg *ngIf="isCorrect(i)"
                       width="18" height="18" viewBox="0 0 24 24" fill="none"
                       style="color: var(--neon-green)">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                    <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2.2"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg *ngIf="!isCorrect(i)"
                       width="18" height="18" viewBox="0 0 24 24" fill="none"
                       style="color: var(--neon-red)">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                    <path d="m9 9 6 6M15 9l-6 6" stroke="currentColor" stroke-width="2.2"
                          stroke-linecap="round"/>
                  </svg>
                </span>

                <div class="review-content">
                  <!-- Question text -->
                  <p class="review-question">{{ q.text }}</p>

                  <!-- Answer breakdown -->
                  <p class="review-answer">
                    Your answer:
                    <span [style.color]="isCorrect(i) ? 'var(--neon-green)' : 'var(--neon-red)'">
                      {{ getAnswerText(i) }}
                    </span>
                    <ng-container *ngIf="!isCorrect(i)">
                      <span style="margin: 0 4px; opacity: 0.4">·</span>
                      Correct: <span style="color: var(--neon-green)">{{ getCorrectText(i) }}</span>
                    </ng-container>
                  </p>

                  <!-- Explanation -->
                  <p *ngIf="result?.explanations?.[i]" class="review-explanation">
                    {{ result?.explanations?.[i] }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Guest upsell ─────────────────────────────────────────── -->
        <div *ngIf="!auth.isAuthenticated()" class="guest-card">
          <svg class="guest-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
          </svg>
          <p class="guest-text">Sign up to track your progress across sessions</p>
          <app-neon-button variant="purple" (click)="goSignup()">Create Account</app-neon-button>
        </div>

        <!-- ── Action buttons ──────────────────────────────────────── -->
        <div class="actions-row">
          <app-neon-button variant="cyan" (click)="replay()">Play Again</app-neon-button>
          <app-neon-button variant="ghost" (click)="goHome()">Home</app-neon-button>
          <app-neon-button variant="purple" (click)="goAnalytics()">Analytics</app-neon-button>
        </div>

      </div>
    </div>
  `,
})
export class ResultsComponent implements OnInit {
  readonly quizState = inject(QuizStateService);
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  get result() { return this.quizState.quizResult(); }

  get accuracyPercent(): number {
    const r = this.result;
    if (!r || r.totalQuestions === 0) return 0;
    return Math.round((r.score / r.totalQuestions) * 100);
  }

  get scoreConfig(): ScoreConfig {
    return getScoreConfig(this.accuracyPercent);
  }

  ngOnInit(): void {
    if (!this.quizState.sessionComplete()) {
      this.router.navigate(['/home']);
    }
  }

  isCorrect(index: number): boolean {
    return this.result?.correctAnswers.includes(index) ?? false;
  }

  getAnswerText(index: number): string {
    const answers = this.quizState.answers();
    const q = this.quizState.questions()[index];
    if (!answers[index] || answers[index].selectedIndex === -1) return 'Timed out';
    return q.options[answers[index].selectedIndex]?.text ?? '—';
  }

  getCorrectText(index: number): string {
    const q = this.quizState.questions()[index];
    const ci = this.result?.correctIndices[index];
    return ci !== undefined ? (q.options[ci]?.text ?? '—') : '—';
  }

  replay(): void {
    const topic = this.quizState.selectedTopic();
    const topicName = this.quizState.selectedTopicName();
    const difficulty = this.quizState.selectedDifficulty();
    this.quizState.reset();
    this.router.navigate(['/quiz'], { queryParams: { topic, topicName, difficulty } });
  }

  goHome(): void {
    this.quizState.reset();
    this.router.navigate(['/home']);
  }

  goAnalytics(): void { this.router.navigate(['/analytics']); }
  goSignup(): void { this.router.navigate(['/signup']); }
}
