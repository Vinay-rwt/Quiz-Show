import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { QuizStateService } from '../../core/services/quiz-state.service';
import { AuthService } from '../../core/services/auth.service';
import { NeonButtonComponent } from '../../shared/components/neon-button.component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, NeonButtonComponent],
  template: `
    <div class="min-h-screen px-4 py-10" style="background-color: var(--bg-dark)">
      <div class="max-w-2xl mx-auto animate-slide-in">

        <!-- Score card — static (not clickable), no hover glow -->
        <div class="neon-card-static p-8 text-center mb-8 border-glow-cyan">
          <p class="text-xs tracking-widest uppercase mb-2" style="color: var(--text-dim)">
            {{ quizState.selectedTopicName() }} • {{ quizState.selectedDifficulty() }}
          </p>
          <h1 class="text-6xl font-black mb-2 glow-cyan" style="color: var(--neon-cyan)">
            {{ result?.score }}<span class="text-3xl text-white/40">/{{ result?.totalQuestions }}</span>
          </h1>
          <p class="text-xl font-semibold mb-1">{{ scoreLabel }}</p>
          <p class="text-sm" style="color: var(--text-dim)">{{ accuracyPercent }}% accuracy</p>
        </div>

        <!-- Question breakdown -->
        <div class="space-y-3 mb-8">
          <h2 class="text-sm font-semibold tracking-widest uppercase" style="color: var(--text-dim)">
            Review
          </h2>
          <div
            *ngFor="let q of quizState.questions(); let i = index"
            class="neon-card p-4"
            [ngClass]="{
              'border-[#39ff14]/30': isCorrect(i),
              'border-[#ff073a]/30': !isCorrect(i)
            }"
          >
            <div class="flex items-start gap-3">
              <span
                class="text-lg mt-0.5 shrink-0"
                [ngClass]="isCorrect(i) ? 'text-[#39ff14]' : 'text-[#ff073a]'"
              >{{ isCorrect(i) ? '✓' : '✗' }}</span>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium mb-1">{{ q.text }}</p>
                <p class="text-xs" style="color: var(--text-dim)">
                  Your answer:
                  <span [ngClass]="isCorrect(i) ? 'text-[#39ff14]' : 'text-[#ff073a]'">
                    {{ getAnswerText(i) }}
                  </span>
                  <span *ngIf="!isCorrect(i)" style="color: var(--text-dim)">
                    &nbsp;· Correct: <span class="text-[#39ff14]">{{ getCorrectText(i) }}</span>
                  </span>
                </p>
                <p *ngIf="result?.explanations?.[i]" class="text-xs mt-1 italic" style="color: var(--text-dim)">
                  {{ result?.explanations?.[i] }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Guest upsell -->
        <div *ngIf="!auth.isAuthenticated()"
             class="neon-card p-4 mb-6 text-center border-[#9d00ff]/30">
          <p class="text-sm mb-2" style="color: var(--text-dim)">
            Sign up to track your progress across sessions
          </p>
          <app-neon-button variant="purple" (click)="goSignup()">Create Account</app-neon-button>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 justify-center flex-wrap">
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

  get scoreLabel(): string {
    const pct = this.accuracyPercent;
    if (pct === 100) return '🏆 Perfect Score!';
    if (pct >= 80)  return '🔥 Excellent!';
    if (pct >= 60)  return '👍 Good job!';
    if (pct >= 40)  return '📚 Keep studying';
    return '💪 Keep going!';
  }

  ngOnInit(): void {
    // Guard: if no session, redirect home (e.g. direct URL navigation)
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
