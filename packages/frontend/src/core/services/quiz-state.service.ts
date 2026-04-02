import { Injectable, signal, computed } from '@angular/core';
import type { QuestionForQuiz, Difficulty, QuizResult, AnswerRecord } from '@quizapp/shared';
import type { TopicSlug } from '@quizapp/shared';

// Tracks one answer the user gave during the quiz
export interface LiveAnswer {
  questionId: string;
  selectedIndex: number; // -1 = timed out
  timeTaken: number;     // seconds
  isCorrect: boolean;
}

// This service is providedIn: 'root' — it's a singleton that outlives any
// individual component. When Angular destroys QuizComponent on navigation
// to /results, this service and its signals persist. ResultsComponent reads
// directly from here without needing route state or query params.
@Injectable({ providedIn: 'root' })
export class QuizStateService {
  // ── Session inputs (set before quiz starts) ───────────────────────────
  readonly selectedTopic    = signal<TopicSlug | null>(null);
  readonly selectedTopicName = signal<string>('');
  readonly selectedDifficulty = signal<Difficulty | null>(null);

  // ── Live quiz state ───────────────────────────────────────────────────
  readonly questions    = signal<QuestionForQuiz[]>([]);
  readonly currentIndex = signal(0);
  readonly answers      = signal<LiveAnswer[]>([]);
  readonly sessionComplete = signal(false);

  // Result returned from POST /api/quiz/submit — stored here so ResultsComponent
  // can access correctIndices and explanations without re-fetching
  readonly quizResult = signal<QuizResult | null>(null);

  // ── Derived / computed ────────────────────────────────────────────────
  readonly currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  readonly totalQuestions  = computed(() => this.questions().length);
  readonly score           = computed(() =>
    this.answers().filter((a) => a.isCorrect).length,
  );
  readonly isLastQuestion  = computed(() =>
    this.currentIndex() === this.totalQuestions() - 1,
  );
  readonly progressPercent = computed(() => {
    const total = this.totalQuestions();
    return total > 0 ? Math.round(((this.currentIndex() + 1) / total) * 100) : 0;
  });

  // ── Mutations ─────────────────────────────────────────────────────────

  startQuiz(
    topic: TopicSlug,
    topicName: string,
    difficulty: Difficulty,
    questions: QuestionForQuiz[],
  ): void {
    this.selectedTopic.set(topic);
    this.selectedTopicName.set(topicName);
    this.selectedDifficulty.set(difficulty);
    this.questions.set(questions);
    this.currentIndex.set(0);
    this.answers.set([]);
    this.sessionComplete.set(false);
    this.quizResult.set(null);
  }

  recordAnswer(answer: LiveAnswer): void {
    this.answers.update((prev) => [...prev, answer]);
  }

  nextQuestion(): void {
    this.currentIndex.update((i) => i + 1);
  }

  completeSession(result: QuizResult): void {
    this.quizResult.set(result);
    this.sessionComplete.set(true);
  }

  // Called when returning to home — prevents stale state leaking into a new quiz
  reset(): void {
    this.selectedTopic.set(null);
    this.selectedTopicName.set('');
    this.selectedDifficulty.set(null);
    this.questions.set([]);
    this.currentIndex.set(0);
    this.answers.set([]);
    this.sessionComplete.set(false);
    this.quizResult.set(null);
  }
}
