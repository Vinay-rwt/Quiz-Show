import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

interface DifficultyConfig {
  level: Difficulty;
  label: string;
  description: string;
  color: string;
  glowRgba: string;
}

const DIFFICULTIES: readonly DifficultyConfig[] = [
  { level: 'EASY',   label: 'Easy',   description: 'Fundamentals & core concepts — perfect for warming up',       color: '#39ff14', glowRgba: 'rgba(57,255,20,' },
  { level: 'MEDIUM', label: 'Medium', description: 'Real-world patterns & APIs — test your applied knowledge',    color: '#ffd700', glowRgba: 'rgba(255,215,0,' },
  { level: 'HARD',   label: 'Hard',   description: 'Advanced internals & edge cases — for the brave',            color: '#ff073a', glowRgba: 'rgba(255,7,58,' },
] as const;

@Component({
  selector: 'app-difficulty',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    /* ── Page ────────────────────────────────────────────────────────── */
    .page {
      min-height: 100vh;
      background-color: var(--bg-dark);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 24px;
    }

    /* ── Back button ─────────────────────────────────────────────────── */
    .back-wrap { width: 100%; max-width: 560px; margin-bottom: 40px; }
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: 10px;
      font-size: .8rem;
      font-weight: 600;
      letter-spacing: .04em;
      cursor: pointer;
      background: transparent;
      border: 1px solid rgba(255,255,255,.1);
      color: rgba(240,246,252,.6);
      transition: color .15s, border-color .15s, box-shadow .15s;
    }
    .back-btn:hover { color:#f0f6fc; border-color:rgba(0,245,255,.35); box-shadow:0 0 14px rgba(0,245,255,.12); }

    /* ── Header ──────────────────────────────────────────────────────── */
    .header {
      text-align: center;
      margin-bottom: 40px;
      width: 100%;
      max-width: 560px;
      animation: slide-in-up .4s cubic-bezier(.16,1,.3,1) forwards;
    }
    .label-above {
      display: block;
      font-size: .7rem;
      font-weight: 600;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 12px;
    }
    .topic-heading {
      display: block;
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: clamp(1.6rem, 4vw, 2.4rem);
      font-weight: 700;
      color: var(--neon-cyan);
      text-shadow: 0 0 12px var(--neon-cyan), 0 0 40px rgba(0,245,255,.45);
      margin-bottom: 16px;
    }
    .header-accent {
      background: linear-gradient(90deg, transparent, var(--neon-cyan), #a78bfa, transparent);
      height: 1px;
      width: 100px;
      margin: 0 auto 16px;
      opacity: .6;
    }
    .select-label {
      display: block;
      font-size: .75rem;
      font-weight: 500;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--text-dim);
    }

    /* ── Cards list ──────────────────────────────────────────────────── */
    .cards-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      max-width: 560px;
    }

    /* ── Difficulty card ─────────────────────────────────────────────── */
    .diff-card {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 22px 24px;
      text-align: left;
      width: 100%;
      background-color: var(--bg-card);
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 16px;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      box-shadow: 0 4px 24px rgba(0,0,0,.4);
      transition: transform .25s cubic-bezier(.16,1,.3,1), border-color .25s, box-shadow .25s;
    }
    .diff-card::before {
      content:''; position:absolute; top:0; left:0; right:0;
      height:1px; opacity:0; transition:opacity .25s;
    }
    .diff-card:hover { transform: translateX(6px); }
    .diff-card:hover::before { opacity:1; }
    .diff-easy::before   { background:linear-gradient(90deg,transparent,#39ff14,transparent); }
    .diff-medium::before { background:linear-gradient(90deg,transparent,#ffd700,transparent); }
    .diff-hard::before   { background:linear-gradient(90deg,transparent,#ff073a,transparent); }

    /* ── Icon badge ──────────────────────────────────────────────────── */
    .diff-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: box-shadow .25s;
    }

    /* ── Card content ────────────────────────────────────────────────── */
    .diff-content { flex: 1; min-width: 0; }
    .diff-label-row { display:flex; align-items:center; gap:12px; margin-bottom:6px; }
    .diff-label {
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: 1.2rem;
      font-weight: 700;
    }
    .diff-badge {
      font-size: .65rem;
      font-weight: 600;
      letter-spacing: .08em;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 9999px;
      background: rgba(255,255,255,.05);
      color: rgba(240,246,252,.4);
      border: 1px solid rgba(255,255,255,.07);
      white-space: nowrap;
    }
    .diff-desc { font-size:.85rem; line-height:1.5; color:var(--text-dim,#8b949e); }

    /* ── Chevron arrow ───────────────────────────────────────────────── */
    .diff-arrow { opacity:.2; transition:opacity .2s,transform .2s; flex-shrink:0; }
    .diff-card:hover .diff-arrow { opacity:.7; transform:translateX(4px); }

    /* ── Stagger entrance ─────────────────────────────────────────────── */
    .stagger-1 { animation:slide-in-up .4s .05s cubic-bezier(.16,1,.3,1) both; }
    .stagger-2 { animation:slide-in-up .4s .14s cubic-bezier(.16,1,.3,1) both; }
    .stagger-3 { animation:slide-in-up .4s .23s cubic-bezier(.16,1,.3,1) both; }

    @keyframes slide-in-up {
      from { transform:translateY(16px); opacity:0; }
      to   { transform:translateY(0); opacity:1; }
    }
  `],
  template: `
    <div class="page">

      <!-- Back -->
      <div class="back-wrap">
        <button class="back-btn" (click)="onBack()" type="button">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 4L6 8l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      <!-- Header -->
      <header class="header">
        <span class="label-above">You selected</span>
        <span class="topic-heading">{{ topicName() }}</span>
        <div class="header-accent"></div>
        <span class="select-label">Select your difficulty</span>
      </header>

      <!-- Difficulty cards -->
      <div class="cards-list">
        @for (diff of difficulties; track diff.level; let i = $index) {
          <button
            class="diff-card"
            [class.stagger-1]="i === 0"
            [class.stagger-2]="i === 1"
            [class.stagger-3]="i === 2"
            [class.diff-easy]="diff.level === 'EASY'"
            [class.diff-medium]="diff.level === 'MEDIUM'"
            [class.diff-hard]="diff.level === 'HARD'"
            [style.border-color]="hovered() === diff.level ? diff.glowRgba + '.4)' : 'rgba(255,255,255,.07)'"
            [style.box-shadow]="hovered() === diff.level
              ? '0 6px 36px ' + diff.glowRgba + '.18),0 4px 24px rgba(0,0,0,.4)'
              : '0 4px 24px rgba(0,0,0,.4)'"
            (mouseenter)="hovered.set(diff.level)"
            (mouseleave)="hovered.set(null)"
            (click)="onDifficultySelect(diff.level)"
            type="button"
          >
            <!-- Icon badge -->
            <div class="diff-icon"
                 [style.background]="diff.glowRgba + '.1)'"
                 [style.border]="'1px solid ' + diff.glowRgba + '.2)'"
                 [style.color]="diff.color"
                 [style.box-shadow]="hovered() === diff.level ? '0 0 18px ' + diff.glowRgba + '.3)' : 'none'">
              @switch (diff.level) {
                @case ('EASY') {
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                    <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                }
                @case ('MEDIUM') {
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                }
                @case ('HARD') {
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="17" r=".5" fill="currentColor" stroke="currentColor" stroke-width="1"/>
                  </svg>
                }
              }
            </div>

            <!-- Content -->
            <div class="diff-content">
              <div class="diff-label-row">
                <span class="diff-label"
                      [style]="'color:' + diff.color + ';text-shadow:0 0 10px ' + diff.color + ',0 0 28px ' + diff.color">
                  {{ diff.label }}
                </span>
                <span class="diff-badge">10 questions · 60s each</span>
              </div>
              <p class="diff-desc">{{ diff.description }}</p>
            </div>

            <!-- Chevron -->
            <div class="diff-arrow" [style.color]="diff.color">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </button>
        }
      </div>

    </div>
  `,
})
export class DifficultyComponent implements OnInit {
  private readonly route  = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly difficulties = DIFFICULTIES;
  readonly topicSlug    = signal<string>('');
  readonly topicName    = signal<string>('');
  readonly hovered      = signal<Difficulty | null>(null);

  readonly displayTopicName = computed(() => this.topicName() || this.topicSlug() || 'Unknown Topic');

  ngOnInit(): void {
    const params    = this.route.snapshot.queryParamMap;
    const topic     = params.get('topic');
    const topicName = params.get('topicName');
    if (!topic) { this.router.navigate(['/home'], { replaceUrl: true }); return; }
    this.topicSlug.set(topic);
    this.topicName.set(topicName ?? topic);
  }

  onDifficultySelect(d: Difficulty): void {
    this.router.navigate(['/quiz'], {
      queryParams: { topic: this.topicSlug(), topicName: this.topicName(), difficulty: d },
    });
  }

  onBack(): void { this.router.navigate(['/home']); }
}
