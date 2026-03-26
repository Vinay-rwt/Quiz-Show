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
  template: `
    <div class="min-h-screen" style="background-color: var(--bg-dark)">

      <app-loading-spinner *ngIf="state() === 'loading'" size="full" />

      <div *ngIf="state() === 'error'"
           class="min-h-screen flex flex-col items-center justify-center gap-4">
        <p class="text-red-400 text-lg">{{ errorMessage() }}</p>
        <app-neon-button variant="cyan" (click)="goHome()">Back to Home</app-neon-button>
      </div>

      <div *ngIf="state() === 'ready' || state() === 'revealing' || state() === 'submitting'"
           class="max-w-2xl mx-auto px-4 py-6 scanline-overlay">

        <!-- Header bar -->
        <div class="flex items-center justify-between mb-6">
          <p class="text-xs tracking-widest uppercase" style="color: var(--text-dim)">
            {{ quizState.selectedTopicName() }} • {{ quizState.selectedDifficulty() }}
          </p>
          <app-timer [totalSeconds]="60" [key]="timerKey()" (timeUp)="onTimeUp()" />
        </div>

        <!-- Progress -->
        <app-progress-bar
          [current]="quizState.currentIndex() + 1"
          [total]="quizState.totalQuestions()"
          class="mb-6 block"
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
        />

        <!-- Explanation revealed after answering -->
        <div *ngIf="state() === 'revealing' && currentExplanation()"
             class="mt-4 p-4 rounded-lg border animate-slide-in"
             style="border-color: rgba(0,245,255,0.2); background-color: var(--bg-card)">
          <p class="text-sm" style="color: var(--neon-cyan)">💡 {{ currentExplanation() }}</p>
        </div>

        <!-- Next / Submit -->
        <div *ngIf="state() === 'revealing'" class="mt-6 flex justify-end">
          <app-neon-button variant="cyan" (click)="advance()" [disabled]="state() === 'submitting'">
            {{ quizState.isLastQuestion() ? 'See Results →' : 'Next Question →' }}
          </app-neon-button>
        </div>

      </div>
    </div>
  `,
})
export class QuizComponent implements OnInit {
  readonly quizState = inject(QuizStateService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly storage = inject(StorageService);

  readonly state = signal<PageState>('loading');
  readonly errorMessage = signal('');
  readonly selectedIndex = signal<number | null>(null);
  readonly revealedCorrectIndex = signal<number | null>(null);
  readonly currentExplanation = signal<string | null>(null);
  readonly timerKey = signal(0);

  private pendingAnswers: LiveAnswer[] = [];
  private questionStartTime = Date.now();

  async ngOnInit(): Promise<void> {
    const params = this.route.snapshot.queryParamMap;
    const topic = params.get('topic') as TopicSlug | null;
    const topicName = params.get('topicName') ?? '';
    const difficulty = params.get('difficulty') as Difficulty | null;

    if (!topic || !difficulty) {
      this.router.navigate(['/home']);
      return;
    }

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
    const timeTaken = Math.min(Math.round((Date.now() - this.questionStartTime) / 1000), 60);
    const q = this.quizState.currentQuestion();
    this.selectedIndex.set(index);
    // isCorrect is a placeholder — patched with ground truth after submit
    this.pendingAnswers.push({ questionId: q.id, selectedIndex: index, timeTaken, isCorrect: false });
    this.state.set('revealing');
  }

  onTimeUp(): void {
    if (this.state() !== 'ready') return;
    const q = this.quizState.currentQuestion();
    this.pendingAnswers.push({ questionId: q.id, selectedIndex: -1, timeTaken: 60, isCorrect: false });
    this.selectedIndex.set(-1);
    this.state.set('revealing');
  }

  async advance(): Promise<void> {
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
          topicSlug: this.quizState.selectedTopic(),
          difficulty: this.quizState.selectedDifficulty(),
          answers: this.pendingAnswers,
        }),
      );

      // Patch isCorrect now that we have ground truth from the server
      const patched: LiveAnswer[] = this.pendingAnswers.map((a, i) => ({
        ...a,
        isCorrect: result.correctIndices[i] === a.selectedIndex,
      }));
      patched.forEach((a) => this.quizState.recordAnswer(a));
      this.quizState.completeSession(result);

      if (!this.auth.isAuthenticated()) {
        this.storage.saveGuestAttempt({
          id: crypto.randomUUID(),
          topicSlug: this.quizState.selectedTopic()!,
          topicName: this.quizState.selectedTopicName(),
          difficulty: this.quizState.selectedDifficulty()!,
          score: result.score,
          totalQuestions: result.totalQuestions,
          completedAt: new Date().toISOString(),
        });
      }

      this.router.navigate(['/results']);
    } catch {
      this.errorMessage.set('Failed to submit quiz. Please try again.');
      this.state.set('error');
    }
  }

  goHome(): void {
    this.quizState.reset();
    this.router.navigate(['/home']);
  }
}
