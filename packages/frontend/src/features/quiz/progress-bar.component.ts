import { Component, Input, computed, signal, OnChanges, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [DecimalPipe],
  styles: [`
    :host { display: block; }

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .label-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .label-text { color: rgba(255,255,255,0.8); }
    .pct-badge {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.4);
      font-variant-numeric: tabular-nums;
    }
    .dots-row {
      display: flex;
      gap: 4px;
      margin-top: 2px;
    }
    .dot {
      height: 4px;
      flex: 1;
      border-radius: 9999px;
      transition: background-color .3s;
    }
  `],
  template: `
    <div class="wrapper" role="status" [attr.aria-label]="ariaLabel()">
      <!-- "Question N of M" label -->
      <div class="label-row">
        <span class="label-text">
          Question
          <span
            style="font-weight:700"
            [style.color]="'var(--neon-cyan)'"
            [style.text-shadow]="'0 0 8px var(--neon-cyan)'"
          >{{ _current() }}</span>
          of
          <span style="color: rgba(255,255,255,0.6)">{{ _total() }}</span>
        </span>

        <!-- Percentage badge -->
        <span class="pct-badge">{{ fillPercent() | number: '1.0-0' }}%</span>
      </div>

      <!-- Progress bar track -->
      <div class="progress-bar" aria-hidden="true">
        <div class="progress-bar-fill" [style.width]="fillWidth()"></div>
      </div>

      <!-- Dot indicators (hidden when total > 20) -->
      @if (_total() <= 20) {
        <div class="dots-row" aria-hidden="true">
          @for (step of steps(); track step.index) {
            <div
              class="dot"
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
})
export class ProgressBarComponent implements OnChanges {
  /** 1-based current question index. */
  @Input({ required: true }) current!: number;

  /** Total number of questions. */
  @Input({ required: true }) total!: number;

  // ── Internal signals (kept in sync via ngOnChanges) ──────────────────────
  readonly _current = signal<number>(1);
  readonly _total = signal<number>(1);

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
