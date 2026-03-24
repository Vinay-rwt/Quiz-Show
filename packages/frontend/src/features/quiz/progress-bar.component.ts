import { Component, Input, computed, signal, OnChanges, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <div class="flex flex-col gap-2" role="status" [attr.aria-label]="ariaLabel()">
      <!-- "Question N of M" label -->
      <div class="flex items-center justify-between text-sm font-medium">
        <span class="text-white/80">
          Question
          <span
            class="font-bold"
            [style.color]="'var(--neon-cyan)'"
            [style.text-shadow]="'0 0 8px var(--neon-cyan)'"
          >
            {{ current }}
          </span>
          of
          <span class="text-white/60">{{ total }}</span>
        </span>

        <!-- Percentage badge -->
        <span class="text-xs text-white/40 tabular-nums">
          {{ fillPercent() | number: '1.0-0' }}%
        </span>
      </div>

      <!-- Progress bar track -->
      <div class="progress-bar" aria-hidden="true">
        <div
          class="progress-bar-fill"
          [style.width]="fillWidth()"
        ></div>
      </div>

      <!-- Dot indicators for step-awareness (optional, gracefully hidden when total > 20) -->
      @if (total <= 20) {
        <div class="flex gap-1 mt-0.5" aria-hidden="true">
          @for (step of steps(); track step.index) {
            <div
              class="h-1 flex-1 rounded-full transition-colors duration-300"
              [style.background-color]="step.state === 'done'
                ? 'var(--neon-cyan)'
                : step.state === 'active'
                  ? 'rgba(0,245,255,0.5)'
                  : 'rgba(255,255,255,0.08)'"
            ></div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class ProgressBarComponent implements OnChanges {
  /** 1-based current question index. */
  @Input({ required: true }) current!: number;

  /** Total number of questions. */
  @Input({ required: true }) total!: number;

  // ── Internal signals (kept in sync via ngOnChanges) ──────────────────────
  private readonly _current = signal<number>(1);
  private readonly _total = signal<number>(1);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['current']) {
      this._current.set(Math.max(1, this.current));
    }
    if (changes['total']) {
      this._total.set(Math.max(1, this.total));
    }
  }

  // ── Derived state ─────────────────────────────────────────────────────────

  /** Percentage complete (0–100), clamped. */
  readonly fillPercent = computed(() => {
    const pct = (this._current() / this._total()) * 100;
    return Math.min(100, Math.max(0, pct));
  });

  /** CSS width string, e.g. "50.00%" */
  readonly fillWidth = computed(() => `${this.fillPercent().toFixed(2)}%`);

  /** Accessible label for screen readers. */
  readonly ariaLabel = computed(
    () => `Quiz progress: question ${this._current()} of ${this._total()}`
  );

  /**
   * Step metadata for the dot indicators.
   * Only rendered when total <= 20 (template guard).
   */
  readonly steps = computed(() =>
    Array.from({ length: this._total() }, (_, i) => ({
      index: i,
      state:
        i + 1 < this._current()
          ? ('done' as const)
          : i + 1 === this._current()
            ? ('active' as const)
            : ('upcoming' as const),
    }))
  );
}
