import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { NgIf } from '@angular/common';
import type { QuestionForQuiz, Difficulty, QuizResult, TopicSlug } from '@quizapp/shared';
import { QuizStateService, LiveAnswer } from '../../core/services/quiz-state.service';
import { AuthService } from '../../core/services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { TimerComponent } from './timer.component';
import { ProgressBarComponent } from './progress-bar.component';
import { QuestionCardComponent } from './question-card.component';
import { NeonButtonComponent } from '../../shared/components/neon-button.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';

type PageState = 'loading' | 'ready' | 'revealing' | 'submitting' | 'error';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgIf, TimerComponent, ProgressBarComponent, QuestionCardComponent, NeonButtonComponent, LoadingSpinnerComponent],
  styles: [`
    .page { min-height:100vh; background-color:var(--bg-dark); }
    .error-wrap {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 24px;
    }
    .quiz-wrap {
      max-width: 640px;
      margin: 0 auto;
      padding: 24px 16px;
    }
    .quiz-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .quiz-meta {
      font-size: .75rem;
      font-weight: 600;
      letter-spacing: .15em;
      text-transform: uppercase;
      color: var(--text-dim);
    }
    .explanation-box {
      margin-top: 16px;
      padding: 16px;
      border-radius: 14px;
      border: 1px solid rgba(0,245,255,.18);
      background: linear-gradient(135deg, rgba(0,245,255,.04), rgba(157,0,255,.03));
      display: flex;
      align-items: flex-start;
      gap: 12px;
      animation: slide-in-up .35s cubic-bezier(.16,1,.3,1) forwards;
    }
    .explanation-text { font-size:.875rem; line-height:1.6; color:rgba(0,245,255,.9); }
    .next-wrap {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
    @keyframes slide-in-up {
      from { transform:translateY(12px); opacity:0; }
      to   { transform:translateY(0); opacity:1; }
    }
  `],
  template: `
    <div class="page">

      <app-loading-spinner *ngIf="state() === 'loading'" size="full" />

      <!-- Error -->
      <div *ngIf="state() === 'error'" class="error-wrap">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style="color:var(--neon-red)">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="17" r=".5" fill="currentColor" stroke="currentColor" stroke-width="1"/>
        </svg>
        <p style="color:var(--neon-red);font-weight:500">{{ errorMessage() }}</p>
        <app-neon-button variant="cyan" (click)="goHome()">Back to Home</app-neon-button>
      </div>

      <!-- Quiz content -->
      <div *ngIf="state() === 'ready' || state() === 'revealing' || state() === 'submitting'"
           class="quiz-wrap scanline-overlay">

        <!-- Header bar -->
        <div class="quiz-header">
          <p class="quiz-meta">
            {{ quizState.selectedTopicName() }}&nbsp;·&nbsp;{{ quizState.selectedDifficulty() }}
          </p>
          <app-timer [totalSeconds]="60" [key]="timerKey()" (timeUp)="onTimeUp()" />
        </div>

        <!-- Progress -->
        <app-progress-bar
          [current]="quizState.currentIndex() + 1"
          [total]="quizState.totalQuestions()"
          class="animate-slide-in block"
          style="display:block;margin-bottom:20px"
        />

        <!-- Question -->
        <app-question-card
          *ngIf="quizState.currentQuestion() as q"
          [question]="q"
          [selectedIndex]="selectedIndex()"
          [correctIndex]="revealedCorrectIndex()"
          [disabled]="state() === 'revealing' || state() === 'submitting'"
          (optionSelected)="onOptionSelected($event)"
          class="animate-slide-in block"
          style="display:block"
        />

        <!-- Explanation -->
        <div *ngIf="state() === 'revealing' && currentExplanation()" class="explanation-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               style="color:var(--neon-cyan);flex-shrink:0;margin-top:2px">
            <path d="M9 18h6M10 21h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="explanation-text">{{ currentExplanation() }}</p>
        </div>

        <!-- Next / Submit -->
        <div *ngIf="(state() === 'ready' && selectedIndex() !== null) || state() === 'revealing'" class="next-wrap">
          <app-neon-button variant="cyan" (click)="advance()" [disabled]="state() === 'submitting'">
            {{ quizState.isLastQuestion() ? 'See Results' : 'Next Question' }}
          </app-neon-button>
        </div>

      </div>
    </div>
  `,
})
export class QuizComponent implements OnInit {
  readonly quizState = inject(QuizStateService);
  private readonly route   = inject(ActivatedRoute);
  private readonly router  = inject(Router);
  private readonly http    = inject(HttpClient);
  private readonly auth    = inject(AuthService);
  private readonly storage = inject(StorageService);

  readonly state               = signal<PageState>('loading');
  readonly errorMessage        = signal('');
  readonly selectedIndex       = signal<number | null>(null);
  readonly revealedCorrectIndex = signal<number | null>(null);
  readonly currentExplanation  = signal<string | null>(null);
  readonly timerKey            = signal(0);

  private pendingAnswers: LiveAnswer[] = [];
  private questionStartTime = Date.now();

  async ngOnInit(): Promise<void> {
    const params     = this.route.snapshot.queryParamMap;
    const topic      = params.get('topic') as TopicSlug | null;
    const topicName  = params.get('topicName') ?? '';
    const difficulty = params.get('difficulty') as Difficulty | null;

    if (!topic || !difficulty) { this.router.navigate(['/home']); return; }

    try {
      const res = await firstValueFrom(
        this.http.get<{ questions: QuestionForQuiz[] }>(
          `/api/questions?topic=${topic}&difficulty=${difficulty}&count=10`,
        ),
      );
      if (res.questions.length === 0) {
        this.errorMessage.set('No questions are available for this topic and difficulty yet.');
        this.state.set('error');
        return;
      }
      this.quizState.startQuiz(topic, topicName, difficulty, res.questions);
      this.pendingAnswers = [];
      this.questionStartTime = Date.now();
      this.state.set('ready');
    } catch {
      this.errorMessage.set('Failed to load questions. Please try again.');
      this.state.set('error');
    }
  }

  onOptionSelected(index: number): void {
    if (this.state() !== 'ready') return;
    this.selectedIndex.set(index);
  }

  onTimeUp(): void {
    if (this.state() !== 'ready') return;
    const q = this.quizState.currentQuestion();
    this.pendingAnswers.push({ questionId: q.id, selectedIndex: -1, timeTaken: 60, isCorrect: false });
    this.selectedIndex.set(-1);
    this.state.set('revealing');
  }

  async advance(): Promise<void> {
    // Record the answer when the user confirms via Next (not on initial click).
    // In the 'revealing' state (timer expired), the answer was already recorded by onTimeUp.
    if (this.state() === 'ready') {
      const timeTaken = Math.min(Math.round((Date.now() - this.questionStartTime) / 1000), 60);
      const q = this.quizState.currentQuestion();
      this.pendingAnswers.push({ questionId: q.id, selectedIndex: this.selectedIndex()!, timeTaken, isCorrect: false });
    }

    if (this.quizState.isLastQuestion()) {
      await this.submitQuiz();
    } else {
      this.quizState.nextQuestion();
      this.selectedIndex.set(null);
      this.revealedCorrectIndex.set(null);
      this.currentExplanation.set(null);
      this.timerKey.update((k) => k + 1);
      this.questionStartTime = Date.now();
      this.state.set('ready');
    }
  }

  private async submitQuiz(): Promise<void> {
    this.state.set('submitting');
    try {
      const result = await firstValueFrom(
        this.http.post<QuizResult>('/api/quiz/submit', {
          topicSlug:  this.quizState.selectedTopic(),
          difficulty: this.quizState.selectedDifficulty(),
          answers:    this.pendingAnswers,
        }),
      );
      const patched: LiveAnswer[] = this.pendingAnswers.map((a, i) => ({
        ...a, isCorrect: result.correctIndices[i] === a.selectedIndex,
      }));
      patched.forEach((a) => this.quizState.recordAnswer(a));
      this.quizState.completeSession(result);

      if (!this.auth.isAuthenticated()) {
        this.storage.saveGuestAttempt({
          id: crypto.randomUUID(),
          topicSlug:       this.quizState.selectedTopic()!,
          topicName:       this.quizState.selectedTopicName(),
          difficulty:      this.quizState.selectedDifficulty()!,
          score:           result.score,
          totalQuestions:  result.totalQuestions,
          completedAt:     new Date().toISOString(),
        });
      }
      this.router.navigate(['/results']);
    } catch {
      this.errorMessage.set('Failed to submit quiz. Please try again.');
      this.state.set('error');
    }
  }

  goHome(): void { this.quizState.reset(); this.router.navigate(['/home']); }
}
