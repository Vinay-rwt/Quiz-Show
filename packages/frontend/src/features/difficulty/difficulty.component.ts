import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// ─── Types ───────────────────────────────────────────────────────────────────

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

interface DifficultyConfig {
  level: Difficulty;
  label: string;
  description: string;
  /** Neon hex colour for glow and text */
  color: string;
  /** rgba version used for border and box-shadow */
  glowRgba: string;
  /** Emoji prefix shown alongside the label */
  emoji: string;
}

// ─── Static difficulty definitions ───────────────────────────────────────────
// These are constant — no signals needed.  Keeping them as a typed const means
// the template gets full autocomplete and the bundle includes zero runtime overhead.

const DIFFICULTIES: readonly DifficultyConfig[] = [
  {
    level:       'EASY',
    label:       'EASY',
    description: 'Fundamentals & core concepts',
    color:       '#39ff14',
    glowRgba:    'rgba(57,255,20,',
    emoji:       '🟢',
  },
  {
    level:       'MEDIUM',
    label:       'MEDIUM',
    description: 'Real-world patterns & APIs',
    color:       '#ffd700',
    glowRgba:    'rgba(255,215,0,',
    emoji:       '🟡',
  },
  {
    level:       'HARD',
    label:       'HARD',
    description: 'Advanced internals & edge cases',
    color:       '#ff073a',
    glowRgba:    'rgba(255,7,58,',
    emoji:       '🔴',
  },
] as const;

// ─── Component ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-difficulty',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    /* Difficulty card base */
    .diff-card {
      background-color: var(--bg-card);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      width: 100%;
    }
    .diff-card:hover {
      transform: scale(1.03);
    }
    /* Per-difficulty hover glows are applied via inline styles in the template
       so the glow colour is data-driven rather than requiring 3 separate CSS classes. */

    /* Back button */
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      cursor: pointer;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.12);
      color: rgba(240,246,252,0.7);
      transition: color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .back-btn:hover {
      color: #f0f6fc;
      border-color: rgba(0,245,255,0.4);
      box-shadow: 0 0 12px rgba(0,245,255,0.15);
    }

    /* Question count badge */
    .badge {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 9999px;
      background: rgba(255,255,255,0.06);
      color: rgba(240,246,252,0.5);
      border: 1px solid rgba(255,255,255,0.08);
    }

    /* Animated entry */
    .stagger-1 { animation: slide-in-up 0.3s 0.05s ease-out both; }
    .stagger-2 { animation: slide-in-up 0.3s 0.15s ease-out both; }
    .stagger-3 { animation: slide-in-up 0.3s 0.25s ease-out both; }

    @keyframes slide-in-up {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    /* Gradient accent line */
    .header-accent {
      background: linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink));
      height: 2px;
      border-radius: 1px;
      margin: 0 auto;
      width: 64px;
    }
  `],
  template: `
    <div class="min-h-screen flex flex-col items-center px-4 py-12"
         style="background-color: var(--bg-dark)">

      <!-- ── Back button ──────────────────────────────────────────────── -->
      <div class="w-full max-w-xl mb-10 flex items-start">
        <button class="back-btn" (click)="onBack()" type="button">
          ← Back
        </button>
      </div>

      <!-- ── Header ───────────────────────────────────────────────────── -->
      <header class="text-center mb-10 animate-slide-in w-full max-w-xl">
        <p class="text-xs font-semibold tracking-widest uppercase mb-2"
           style="color: var(--text-dim, #8b949e)">
          You selected:
        </p>
        <h1 class="text-3xl md:text-4xl font-black uppercase tracking-widest glow-cyan mb-3"
            style="color: var(--neon-cyan)">
          {{ topicName() }}
        </h1>
        <div class="header-accent mb-4"></div>
        <p class="text-sm tracking-widest uppercase"
           style="color: var(--text-dim, #8b949e)">
          Select your difficulty
        </p>
      </header>

      <!-- ── Difficulty cards ──────────────────────────────────────────── -->
      <div class="flex flex-col gap-5 w-full max-w-xl">
        @for (diff of difficulties; track diff.level; let i = $index) {
          <button
            class="diff-card p-7 flex flex-col gap-3 text-left"
            [class.stagger-1]="i === 0"
            [class.stagger-2]="i === 1"
            [class.stagger-3]="i === 2"
            [style.border-color]="hovered() === diff.level
              ? diff.glowRgba + '0.45)'
              : 'rgba(255,255,255,0.08)'"
            [style.box-shadow]="hovered() === diff.level
              ? '0 0 28px ' + diff.glowRgba + '0.2), inset 0 0 14px ' + diff.glowRgba + '0.05)'
              : 'none'"
            (mouseenter)="hovered.set(diff.level)"
            (mouseleave)="hovered.set(null)"
            (click)="onDifficultySelect(diff.level)"
            type="button"
          >
            <!-- Level label row -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-2xl leading-none select-none">{{ diff.emoji }}</span>
                <span
                  class="text-2xl font-black uppercase tracking-widest"
                  [style]="'color: ' + diff.color + '; text-shadow: 0 0 10px ' + diff.color + ', 0 0 30px ' + diff.color"
                >{{ diff.label }}</span>
              </div>
              <!-- Question count badge -->
              <span class="badge">10 questions • 60s per question</span>
            </div>

            <!-- Description -->
            <p class="text-sm" style="color: var(--text-dim, #8b949e); padding-left: 44px">
              {{ diff.description }}
            </p>
          </button>
        }
      </div>

    </div>
  `,
})
export class DifficultyComponent implements OnInit {
  // ── DI ───────────────────────────────────────────────────────────────────
  private readonly route  = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // ── Static data (no signal needed — never changes) ───────────────────────
  readonly difficulties = DIFFICULTIES;

  // ── Route-derived state ──────────────────────────────────────────────────
  // Signals are used here so the template is purely reactive.
  // The values are set once in ngOnInit from the snapshot; they never change
  // after that, but signals give us the ergonomic {{ signal() }} template syntax.
  readonly topicSlug = signal<string>('');
  readonly topicName = signal<string>('');

  // ── Hover state (for per-card glow on hover) ─────────────────────────────
  // A single signal tracking which card is hovered keeps the template clean:
  // one signal vs. an array of booleans or a CSS :hover workaround.
  readonly hovered = signal<Difficulty | null>(null);

  // ── Derived: the current topic label shown in the header ─────────────────
  readonly displayTopicName = computed(() =>
    this.topicName() || this.topicSlug() || 'Unknown Topic'
  );

  // ─────────────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    // Using snapshot here is intentional: query params don't change while
    // this component is mounted (navigating away remounts it fresh).
    // An observable subscription would require cleanup for no benefit.
    const params = this.route.snapshot.queryParamMap;
    const topic     = params.get('topic');
    const topicName = params.get('topicName');

    if (!topic) {
      // Guard: if someone lands here without a topic (e.g. direct URL), bounce to home.
      this.router.navigate(['/home'], { replaceUrl: true });
      return;
    }

    this.topicSlug.set(topic);
    this.topicName.set(topicName ?? topic);
  }

  onDifficultySelect(difficulty: Difficulty): void {
    this.router.navigate(['/quiz'], {
      queryParams: {
        topic:      this.topicSlug(),
        topicName:  this.topicName(),
        difficulty,
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }
}
