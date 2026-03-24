import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import type { AnalyticsSummary, LeaderboardEntry, QuizAttempt } from '@quizapp/shared';
import { AuthService } from '../../core/services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { NeonButtonComponent } from '../../shared/components/neon-button.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';

// Map topic slug → neon hex for bar chart colours
const TOPIC_COLORS: Record<string, string> = {
  react:          '#00f5ff',
  angular:        '#ff00de',
  typescript:     '#9d00ff',
  'system-design': '#ffd700',
};

function topicColor(slug: string): string {
  return TOPIC_COLORS[slug] ?? '#00f5ff';
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, NeonButtonComponent, LoadingSpinnerComponent],
  template: `
    <div class="min-h-screen px-4 py-10" style="background-color: var(--bg-dark)">
      <div class="max-w-3xl mx-auto">

        <!-- Loading -->
        <app-loading-spinner *ngIf="loading()" size="full" />

        <ng-container *ngIf="!loading()">

          <!-- ── Header ──────────────────────────────────────────────────── -->
          <div class="flex items-center justify-between mb-8 animate-slide-in">
            <div>
              <p class="text-xs tracking-widest uppercase mb-1" style="color: var(--text-dim)">
                {{ auth.isAuthenticated() ? auth.currentUser()?.username : 'Guest' }}
              </p>
              <h1 class="text-3xl font-black tracking-widest uppercase glow-cyan"
                  style="color: var(--neon-cyan)">Analytics</h1>
            </div>
            <div class="flex gap-3">
              <app-neon-button variant="ghost" (click)="goHome()">Home</app-neon-button>
              <app-neon-button *ngIf="auth.isAuthenticated()" variant="ghost" (click)="logout()">
                Sign Out
              </app-neon-button>
            </div>
          </div>

          <!-- ── Guest upsell banner ──────────────────────────────────────── -->
          <div *ngIf="!auth.isAuthenticated()"
               class="neon-card p-4 mb-8 border-[#9d00ff]/30 text-center">
            <p class="text-sm mb-3" style="color: var(--text-dim)">
              You're viewing local quiz history. Sign up to track progress across devices.
            </p>
            <div class="flex gap-3 justify-center">
              <app-neon-button variant="purple" (click)="goSignup()">Create Account</app-neon-button>
              <app-neon-button variant="ghost" (click)="goLogin()">Sign In</app-neon-button>
            </div>
          </div>

          <!-- ── Overall stats row ───────────────────────────────────────── -->
          <div *ngIf="summary()" class="grid grid-cols-3 gap-4 mb-8">
            <div class="neon-card p-5 text-center border-glow-cyan">
              <p class="text-3xl font-black mb-1" style="color: var(--neon-cyan)">
                {{ summary()!.totalQuizzes }}
              </p>
              <p class="text-xs tracking-widest uppercase" style="color: var(--text-dim)">
                Quizzes
              </p>
            </div>
            <div class="neon-card p-5 text-center border-[#39ff14]/30">
              <p class="text-3xl font-black mb-1" style="color: #39ff14">
                {{ summary()!.overallAccuracy }}%
              </p>
              <p class="text-xs tracking-widest uppercase" style="color: var(--text-dim)">
                Accuracy
              </p>
            </div>
            <div class="neon-card p-5 text-center border-[#9d00ff]/30">
              <p class="text-3xl font-black mb-1" style="color: var(--neon-purple)">
                {{ summary()!.totalCorrect }}<span class="text-lg text-white/30">/{{ summary()!.totalQuestions }}</span>
              </p>
              <p class="text-xs tracking-widest uppercase" style="color: var(--text-dim)">
                Correct
              </p>
            </div>
          </div>

          <!-- No attempts yet -->
          <div *ngIf="!summary() || summary()!.totalQuizzes === 0"
               class="neon-card p-8 text-center mb-8">
            <p class="text-4xl mb-3">🎮</p>
            <p class="font-semibold mb-1">No quizzes yet</p>
            <p class="text-sm mb-4" style="color: var(--text-dim)">
              Complete a quiz to see your stats here
            </p>
            <app-neon-button variant="cyan" (click)="goHome()">Start a Quiz</app-neon-button>
          </div>

          <!-- ── Topic accuracy bars ─────────────────────────────────────── -->
          <div *ngIf="summary() && summary()!.byTopic.length > 0" class="neon-card p-6 mb-6">
            <h2 class="text-xs font-semibold tracking-widest uppercase mb-5"
                style="color: var(--text-dim)">Accuracy by Topic</h2>
            <div class="space-y-4">
              <div *ngFor="let t of summary()!.byTopic">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-sm font-semibold">{{ t.topicName }}</span>
                  <div class="flex items-center gap-3 text-xs" style="color: var(--text-dim)">
                    <span *ngIf="t.averageTimeTaken > 0">⏱ {{ t.averageTimeTaken }}s avg</span>
                    <span>{{ t.totalAttempts }} {{ t.totalAttempts === 1 ? 'quiz' : 'quizzes' }}</span>
                    <span class="font-bold text-sm"
                          [style.color]="topicColorFn(t.topicSlug)">
                      {{ t.averageScore }}%
                    </span>
                  </div>
                </div>
                <!-- Bar track -->
                <div class="h-2 rounded-full" style="background: rgba(255,255,255,0.06)">
                  <div
                    class="h-2 rounded-full transition-all duration-700"
                    [style.width]="t.averageScore + '%'"
                    [style.background-color]="topicColorFn(t.topicSlug)"
                    [style.box-shadow]="'0 0 8px ' + topicColorFn(t.topicSlug)"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Recent attempts ─────────────────────────────────────────── -->
          <div *ngIf="recentAttempts().length > 0" class="neon-card p-6 mb-6">
            <h2 class="text-xs font-semibold tracking-widest uppercase mb-4"
                style="color: var(--text-dim)">Recent Quizzes</h2>
            <div class="space-y-2">
              <div *ngFor="let a of recentAttempts()"
                   class="flex items-center justify-between py-2 border-b"
                   style="border-color: rgba(255,255,255,0.06)">
                <div>
                  <span class="text-sm font-medium">{{ a.topicName }}</span>
                  <span class="ml-2 text-xs px-2 py-0.5 rounded"
                        style="background: rgba(255,255,255,0.06); color: var(--text-dim)">
                    {{ a.difficulty }}
                  </span>
                </div>
                <div class="flex items-center gap-4 text-right">
                  <span class="text-sm font-bold"
                        [style.color]="scoreColor(a.score, a.totalQuestions)">
                    {{ a.score }}/{{ a.totalQuestions }}
                  </span>
                  <span class="text-xs" style="color: var(--text-dim)">
                    {{ a.completedAt | date: 'MMM d' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- ── Leaderboard ─────────────────────────────────────────────── -->
          <div class="neon-card p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xs font-semibold tracking-widest uppercase"
                  style="color: var(--text-dim)">Leaderboard</h2>
              <!-- Topic filter tabs -->
              <div class="flex gap-2 flex-wrap justify-end">
                <button
                  *ngFor="let tab of leaderboardTabs"
                  (click)="setLeaderboardTopic(tab.slug)"
                  class="text-xs px-3 py-1 rounded-full border transition-all"
                  [style.border-color]="leaderboardTopic() === tab.slug
                    ? topicColorFn(tab.slug || 'react')
                    : 'rgba(255,255,255,0.12)'"
                  [style.color]="leaderboardTopic() === tab.slug
                    ? topicColorFn(tab.slug || 'react')
                    : 'rgba(240,246,252,0.5)'"
                  [style.box-shadow]="leaderboardTopic() === tab.slug
                    ? '0 0 8px ' + topicColorFn(tab.slug || 'react')
                    : 'none'"
                >{{ tab.label }}</button>
              </div>
            </div>

            <!-- Loading leaderboard -->
            <div *ngIf="leaderboardLoading()" class="py-6 flex justify-center">
              <app-loading-spinner size="sm" />
            </div>

            <!-- Empty leaderboard -->
            <p *ngIf="!leaderboardLoading() && leaderboard().length === 0"
               class="text-sm text-center py-4" style="color: var(--text-dim)">
              No scores yet. Be the first!
            </p>

            <!-- Leaderboard rows -->
            <div *ngIf="!leaderboardLoading() && leaderboard().length > 0" class="space-y-2">
              <div *ngFor="let entry of leaderboard()"
                   class="flex items-center gap-3 py-2 border-b"
                   style="border-color: rgba(255,255,255,0.06)">
                <!-- Rank badge -->
                <span
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                  [style.background]="entry.rank <= 3 ? rankBg(entry.rank) : 'rgba(255,255,255,0.06)'"
                  [style.color]="entry.rank <= 3 ? '#030712' : 'rgba(240,246,252,0.5)'"
                >{{ entry.rank }}</span>
                <!-- Name + topic -->
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold truncate">{{ entry.username }}</p>
                  <p class="text-xs truncate" style="color: var(--text-dim)">
                    {{ entry.topicName }}
                  </p>
                </div>
                <!-- Score -->
                <span class="text-sm font-bold" style="color: var(--neon-cyan)">
                  {{ entry.score }}/{{ entry.totalQuestions }}
                </span>
              </div>
            </div>
          </div>

        </ng-container>
      </div>
    </div>
  `,
})
export class AnalyticsComponent implements OnInit {
  readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly summary = signal<AnalyticsSummary | null>(null);
  readonly recentAttempts = signal<QuizAttempt[]>([]);
  readonly leaderboard = signal<LeaderboardEntry[]>([]);
  readonly leaderboardLoading = signal(false);
  readonly leaderboardTopic = signal<string>('');

  readonly leaderboardTabs = [
    { slug: '',               label: 'All' },
    { slug: 'react',          label: 'React' },
    { slug: 'angular',        label: 'Angular' },
    { slug: 'typescript',     label: 'TypeScript' },
    { slug: 'system-design',  label: 'System Design' },
  ];

  readonly topicColorFn = topicColor;

  async ngOnInit(): Promise<void> {
    await Promise.all([this.loadStats(), this.loadLeaderboard()]);
    this.loading.set(false);
  }

  private async loadStats(): Promise<void> {
    if (this.auth.isAuthenticated()) {
      // Authenticated: fetch aggregated summary + recent attempts from API
      const [summaryRes, historyRes] = await Promise.all([
        firstValueFrom(this.http.get<AnalyticsSummary>('/api/analytics/me')).catch(() => null),
        firstValueFrom(
          this.http.get<{ attempts: QuizAttempt[] }>('/api/analytics/history?limit=10'),
        ).catch(() => ({ attempts: [] })),
      ]);
      this.summary.set(summaryRes);
      this.recentAttempts.set(historyRes?.attempts ?? []);
    } else {
      // Guest: derive summary from localStorage
      const attempts = this.storage.getGuestAttempts();
      this.recentAttempts.set(attempts.slice(0, 10));
      this.summary.set(this.computeGuestSummary(attempts));
    }
  }

  private async loadLeaderboard(topic = ''): Promise<void> {
    this.leaderboardLoading.set(true);
    const url = topic
      ? `/api/leaderboard?topic=${topic}&limit=10`
      : '/api/leaderboard?limit=10';
    const data = await firstValueFrom(
      this.http.get<LeaderboardEntry[]>(url),
    ).catch(() => []);
    this.leaderboard.set(data);
    this.leaderboardLoading.set(false);
  }

  async setLeaderboardTopic(slug: string): Promise<void> {
    this.leaderboardTopic.set(slug);
    await this.loadLeaderboard(slug);
  }

  // Derives an AnalyticsSummary from flat QuizAttempt[] stored in localStorage.
  // Guests don't have per-question time data, so averageTimeTaken is omitted (0).
  private computeGuestSummary(attempts: QuizAttempt[]): AnalyticsSummary | null {
    if (attempts.length === 0) return null;

    let totalCorrect = 0;
    let totalQuestions = 0;
    const byTopicMap = new Map<string, { name: string; correct: number; total: number; count: number }>();

    for (const a of attempts) {
      totalCorrect += a.score;
      totalQuestions += a.totalQuestions;

      const entry = byTopicMap.get(a.topicSlug) ?? {
        name: a.topicName, correct: 0, total: 0, count: 0,
      };
      entry.correct += a.score;
      entry.total += a.totalQuestions;
      entry.count += 1;
      byTopicMap.set(a.topicSlug, entry);
    }

    return {
      totalQuizzes: attempts.length,
      totalCorrect,
      totalQuestions,
      overallAccuracy: totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0,
      byTopic: Array.from(byTopicMap.entries()).map(([slug, t]) => ({
        topicSlug: slug as AnalyticsSummary['byTopic'][number]['topicSlug'],
        topicName: t.name,
        totalAttempts: t.count,
        averageScore: t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0,
        averageTimeTaken: 0,
      })),
    };
  }

  scoreColor(score: number, total: number): string {
    const pct = total > 0 ? (score / total) * 100 : 0;
    if (pct >= 80) return '#39ff14';
    if (pct >= 60) return 'var(--neon-cyan)';
    if (pct >= 40) return '#ffd700';
    return '#ff073a';
  }

  rankBg(rank: number): string {
    if (rank === 1) return '#ffd700'; // gold
    if (rank === 2) return '#c0c0c0'; // silver
    return '#cd7f32';                  // bronze
  }

  goHome(): void { this.router.navigate(['/home']); }
  goSignup(): void { this.router.navigate(['/signup']); }
  goLogin(): void { this.router.navigate(['/login']); }
  async logout(): Promise<void> { await this.auth.logout(); }
}
