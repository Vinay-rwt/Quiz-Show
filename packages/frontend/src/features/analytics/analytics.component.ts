import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  styles: [`
    /* ── Page ────────────────────────────────────────────────────── */
    .page {
      min-height: 100vh;
      background-color: var(--bg-dark);
      padding: 40px 16px 80px;
    }
    .content {
      max-width: 720px;
      margin: 0 auto;
    }

    /* ── Header ──────────────────────────────────────────────────── */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
      animation: slide-in-up .4s cubic-bezier(.16,1,.3,1) forwards;
    }
    .page-title {
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: 1.75rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--neon-cyan);
      text-shadow: 0 0 20px var(--neon-cyan);
    }
    .username-label {
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 4px;
    }
    .header-actions {
      display: flex;
      gap: 12px;
    }

    /* ── Error / upsell banners ──────────────────────────────────── */
    .error-banner {
      background-color: var(--bg-card);
      border: 1px solid rgba(255,7,58,0.3);
      border-radius: 12px;
      box-shadow: 0 0 12px rgba(255,7,58,0.1);
      padding: 16px;
      text-align: center;
      margin-bottom: 24px;
      font-size: 0.875rem;
      color: var(--neon-red);
    }
    .guest-banner {
      background-color: var(--bg-card);
      border: 1px solid rgba(157,0,255,0.25);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5);
      padding: 16px;
      text-align: center;
      margin-bottom: 32px;
    }
    .guest-banner-text {
      font-size: 0.875rem;
      color: var(--text-dim);
      margin-bottom: 12px;
    }
    .guest-banner-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }

    /* ── Stats grid ──────────────────────────────────────────────── */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }
    .stat-card {
      background-color: var(--bg-card);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5);
      padding: 20px;
      text-align: center;
    }
    .stat-value {
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: 1.75rem;
      font-weight: 800;
      margin-bottom: 4px;
      line-height: 1;
    }
    .stat-label {
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-dim);
    }
    .stat-sub {
      font-size: 1rem;
      font-weight: 500;
      color: rgba(240,246,252,0.3);
    }

    /* ── Section card ────────────────────────────────────────────── */
    .section-card {
      background-color: var(--bg-card);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5);
      padding: 24px;
      margin-bottom: 24px;
    }
    .section-title {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--text-dim);
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
    }

    /* ── Empty state ─────────────────────────────────────────────── */
    .empty-state {
      background-color: var(--bg-card);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5);
      padding: 32px;
      text-align: center;
      margin-bottom: 32px;
    }
    .empty-icon {
      font-size: 2.5rem;
      margin-bottom: 12px;
    }
    .empty-title {
      font-weight: 600;
      margin-bottom: 4px;
      font-size: 1rem;
    }
    .empty-desc {
      font-size: 0.875rem;
      color: var(--text-dim);
      margin-bottom: 16px;
    }

    /* ── Topic bars ──────────────────────────────────────────────── */
    .topic-bars { display: flex; flex-direction: column; gap: 16px; margin-top: 20px; }
    .topic-row-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .topic-name { font-size: 0.875rem; font-weight: 600; }
    .topic-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.75rem;
      color: var(--text-dim);
    }
    .topic-score { font-weight: 700; font-size: 0.875rem; }
    .bar-track {
      height: 8px;
      border-radius: 9999px;
      background: rgba(255,255,255,0.06);
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      border-radius: 9999px;
      transition: width .7s cubic-bezier(.4,0,.2,1);
    }

    /* ── Recent attempts ─────────────────────────────────────────── */
    .attempts-list { display: flex; flex-direction: column; gap: 8px; margin-top: 16px; }
    .attempt-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .attempt-row:last-child { border-bottom: none; }
    .attempt-topic { font-size: 0.875rem; font-weight: 500; }
    .attempt-badge {
      display: inline-block;
      margin-left: 8px;
      font-size: 0.7rem;
      padding: 2px 8px;
      border-radius: 9999px;
      background: rgba(255,255,255,0.06);
      color: var(--text-dim);
    }
    .attempt-right {
      display: flex;
      align-items: center;
      gap: 16px;
      text-align: right;
    }
    .attempt-score { font-size: 0.875rem; font-weight: 700; }
    .attempt-date { font-size: 0.75rem; color: var(--text-dim); }

    /* ── Leaderboard ─────────────────────────────────────────────── */
    .lb-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .lb-tabs {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .lb-tab {
      font-size: 0.7rem;
      padding: 4px 12px;
      border-radius: 9999px;
      border: 1px solid rgba(255,255,255,0.12);
      background: transparent;
      color: rgba(240,246,252,0.5);
      cursor: pointer;
      transition: border-color .2s, color .2s, box-shadow .2s;
    }
    .lb-empty {
      font-size: 0.875rem;
      text-align: center;
      padding: 16px 0;
      color: var(--text-dim);
    }
    .lb-spinner { padding: 24px 0; display: flex; justify-content: center; }
    .lb-list { display: flex; flex-direction: column; gap: 8px; }
    .lb-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .lb-row:last-child { border-bottom: none; }
    .rank-badge {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      font-weight: 800;
      flex-shrink: 0;
    }
    .lb-user { flex: 1; min-width: 0; }
    .lb-username {
      font-size: 0.875rem;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .lb-topic {
      font-size: 0.75rem;
      color: var(--text-dim);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .lb-score {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--neon-cyan);
    }

    @keyframes slide-in-up {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
  `],
  template: `
    <div class="page">
      <app-loading-spinner *ngIf="loading()" size="full" />

      <div *ngIf="!loading()" class="content">

        <!-- ── Header ──────────────────────────────────────────────────── -->
        <div class="page-header">
          <div>
            <p class="username-label">
              {{ auth.isAuthenticated() ? auth.currentUser()?.username : 'Guest' }}
            </p>
            <h1 class="page-title">Analytics</h1>
          </div>
          <div class="header-actions">
            <app-neon-button variant="ghost" (click)="goHome()">Home</app-neon-button>
            <app-neon-button *ngIf="auth.isAuthenticated()" variant="ghost" (click)="logout()">
              Sign Out
            </app-neon-button>
          </div>
        </div>

        <!-- ── API error banner ────────────────────────────────────────── -->
        <div *ngIf="apiError()" class="error-banner">
          Failed to load your stats. Please try refreshing the page.
        </div>

        <!-- ── Guest upsell banner ──────────────────────────────────────── -->
        <div *ngIf="!auth.isAuthenticated()" class="guest-banner">
          <p class="guest-banner-text">
            You're viewing local quiz history. Sign up to track progress across devices.
          </p>
          <div class="guest-banner-actions">
            <app-neon-button variant="purple" (click)="goSignup()">Create Account</app-neon-button>
            <app-neon-button variant="ghost" (click)="goLogin()">Sign In</app-neon-button>
          </div>
        </div>

        <!-- ── Overall stats row ─────────────────────────────────────────── -->
        <div *ngIf="summary()" class="stats-grid">
          <div class="stat-card" style="border-color: rgba(0,245,255,0.2)">
            <p class="stat-value" style="color: var(--neon-cyan)">{{ summary()!.totalQuizzes }}</p>
            <p class="stat-label">Quizzes</p>
          </div>
          <div class="stat-card" style="border-color: rgba(57,255,20,0.2)">
            <p class="stat-value" style="color: #39ff14">{{ summary()!.overallAccuracy }}%</p>
            <p class="stat-label">Accuracy</p>
          </div>
          <div class="stat-card" style="border-color: rgba(157,0,255,0.2)">
            <p class="stat-value" style="color: var(--neon-purple)">
              {{ summary()!.totalCorrect }}<span class="stat-sub">/{{ summary()!.totalQuestions }}</span>
            </p>
            <p class="stat-label">Correct</p>
          </div>
        </div>

        <!-- No attempts yet -->
        <div *ngIf="!summary() || summary()!.totalQuizzes === 0" class="empty-state">
          <p class="empty-icon">🎮</p>
          <p class="empty-title">No quizzes yet</p>
          <p class="empty-desc">Complete a quiz to see your stats here</p>
          <app-neon-button variant="cyan" (click)="goHome()">Start a Quiz</app-neon-button>
        </div>

        <!-- ── Topic accuracy bars ─────────────────────────────────────── -->
        <div *ngIf="summary() && summary()!.byTopic.length > 0" class="section-card">
          <h2 class="section-title">Accuracy by Topic</h2>
          <div class="topic-bars">
            <div *ngFor="let t of summary()!.byTopic">
              <div class="topic-row-header">
                <span class="topic-name">{{ t.topicName }}</span>
                <div class="topic-meta">
                  <span *ngIf="t.averageTimeTaken > 0">{{ t.averageTimeTaken }}s avg</span>
                  <span>{{ t.totalAttempts }} {{ t.totalAttempts === 1 ? 'quiz' : 'quizzes' }}</span>
                  <span class="topic-score" [style.color]="topicColorFn(t.topicSlug)">
                    {{ t.averageScore }}%
                  </span>
                </div>
              </div>
              <div class="bar-track">
                <div class="bar-fill"
                     [style.width]="t.averageScore + '%'"
                     [style.background-color]="topicColorFn(t.topicSlug)"
                     [style.box-shadow]="'0 0 8px ' + topicColorFn(t.topicSlug)">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Recent attempts ─────────────────────────────────────────── -->
        <div *ngIf="recentAttempts().length > 0" class="section-card">
          <h2 class="section-title">Recent Quizzes</h2>
          <div class="attempts-list">
            <div *ngFor="let a of recentAttempts()" class="attempt-row">
              <div>
                <span class="attempt-topic">{{ a.topicName }}</span>
                <span class="attempt-badge">{{ a.difficulty }}</span>
              </div>
              <div class="attempt-right">
                <span class="attempt-score" [style.color]="scoreColor(a.score, a.totalQuestions)">
                  {{ a.score }}/{{ a.totalQuestions }}
                </span>
                <span class="attempt-date">{{ a.completedAt | date: 'MMM d' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Leaderboard ─────────────────────────────────────────────── -->
        <div class="section-card">
          <div class="lb-header">
            <h2 class="section-title">Leaderboard</h2>
            <div class="lb-tabs">
              <button
                *ngFor="let tab of leaderboardTabs"
                class="lb-tab"
                (click)="setLeaderboardTopic(tab.slug)"
                type="button"
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

          <!-- Loading -->
          <div *ngIf="leaderboardLoading()" class="lb-spinner">
            <app-loading-spinner size="sm" />
          </div>

          <!-- Empty -->
          <p *ngIf="!leaderboardLoading() && leaderboard().length === 0" class="lb-empty">
            No scores yet. Be the first!
          </p>

          <!-- Rows -->
          <div *ngIf="!leaderboardLoading() && leaderboard().length > 0" class="lb-list">
            <div *ngFor="let entry of leaderboard()" class="lb-row">
              <span class="rank-badge"
                    [style.background]="entry.rank <= 3 ? rankBg(entry.rank) : 'rgba(255,255,255,0.06)'"
                    [style.color]="entry.rank <= 3 ? '#030712' : 'rgba(240,246,252,0.5)'">
                {{ entry.rank }}
              </span>
              <div class="lb-user">
                <p class="lb-username">{{ entry.username }}</p>
                <p class="lb-topic">{{ entry.topicName }}</p>
              </div>
              <span class="lb-score">{{ entry.score }}/{{ entry.totalQuestions }}</span>
            </div>
          </div>
        </div>

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
  readonly apiError = signal(false);
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
      const [summaryRes, historyRes] = await Promise.all([
        firstValueFrom(this.http.get<AnalyticsSummary>('/api/analytics/me')).catch(() => {
          this.apiError.set(true);
          return null;
        }),
        firstValueFrom(
          this.http.get<{ attempts: QuizAttempt[] }>('/api/analytics/history?limit=10'),
        ).catch(() => ({ attempts: [] as QuizAttempt[] })),
      ]);
      this.summary.set(summaryRes);
      this.recentAttempts.set(historyRes?.attempts ?? []);
    } else {
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
    if (rank === 1) return '#ffd700';
    if (rank === 2) return '#c0c0c0';
    return '#cd7f32';
  }

  goHome(): void { this.router.navigate(['/home']); }
  goSignup(): void { this.router.navigate(['/signup']); }
  goLogin(): void { this.router.navigate(['/login']); }
  async logout(): Promise<void> { await this.auth.logout(); }
}
