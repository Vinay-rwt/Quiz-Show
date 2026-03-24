import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      class="flex flex-col items-center gap-2"
      [ngClass]="{ 'animate-timer-pulse': isUrgent() }"
    >
      <!-- SVG circular progress ring -->
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        class="rotate-[-90deg]"
        aria-hidden="true"
      >
        <!-- Track ring -->
        <circle
          cx="48"
          cy="48"
          r="40"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          stroke-width="6"
        />
        <!-- Progress ring — depletes as time runs out -->
        <circle
          cx="48"
          cy="48"
          r="40"
          fill="none"
          [attr.stroke]="isUrgent() ? 'var(--neon-red)' : 'var(--neon-cyan)'"
          stroke-width="6"
          stroke-linecap="round"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="dashOffset()"
          style="transition: stroke-dashoffset 0.9s linear, stroke 0.3s ease;"
        />
      </svg>

      <!-- Countdown text — overlaid on the SVG via absolute positioning wrapper -->
      <span
        class="text-2xl font-bold font-mono tabular-nums leading-none"
        [style.color]="isUrgent() ? 'var(--neon-red)' : 'var(--neon-cyan)'"
        [style.text-shadow]="isUrgent()
          ? '0 0 10px var(--neon-red), 0 0 30px var(--neon-red)'
          : '0 0 10px var(--neon-cyan), 0 0 30px var(--neon-cyan)'"
        aria-live="polite"
        aria-atomic="true"
        [attr.aria-label]="formattedTime() + ' remaining'"
      >
        {{ formattedTime() }}
      </span>
    </div>
  `,
  styles: [`
    :host { display: block; }

    /* Overlay the countdown text centred inside the SVG */
    :host {
      display: inline-grid;
      place-items: center;
    }
    svg,
    span {
      grid-row: 1;
      grid-column: 1;
    }
    span {
      /* SVG is rotated -90 deg; text must be un-rotated */
      transform: rotate(90deg);
    }
  `],
})
export class TimerComponent implements OnInit, OnChanges {
  /** Total duration of the countdown in seconds (default 60). */
  @Input() totalSeconds = 60;

  /**
   * Changing this value resets the timer. QuizComponent increments it on
   * every "Next Question" so the same timer instance restarts without
   * destroying and recreating the component (avoids animation flicker).
   */
  @Input() key = 0;

  /** Emits once when the timer reaches zero. */
  @Output() timeUp = new EventEmitter<void>();

  /** Emits the current seconds remaining on every tick. */
  @Output() tick = new EventEmitter<number>();

  // ── Angular DI ──────────────────────────────────────────────────────────
  private readonly destroyRef = inject(DestroyRef);

  // ── Reactive state ───────────────────────────────────────────────────────
  readonly secondsLeft = signal<number>(0);

  // ── SVG geometry ─────────────────────────────────────────────────────────
  /** 2πr where r = 40 (matches the SVG circle radius). */
  readonly circumference = 2 * Math.PI * 40; // ≈ 251.33

  /** Shrinks as time elapses — at full time the offset is 0 (full ring visible). */
  readonly dashOffset = computed(() => {
    const ratio = this.secondsLeft() / this.totalSeconds;
    return this.circumference * (1 - ratio);
  });

  // ── Derived display state ────────────────────────────────────────────────
  readonly isUrgent = computed(() => this.secondsLeft() <= 10);

  readonly formattedTime = computed(() => {
    const secs = this.secondsLeft();
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  });

  // ── Internal interval handle ─────────────────────────────────────────────
  private intervalId: ReturnType<typeof setInterval> | null = null;

  // ── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.startTimer();
    this.destroyRef.onDestroy(() => this.clearTimer());
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Only react to `key` changes after init (ngOnInit hasn't run on first change)
    if (changes['key'] && !changes['key'].firstChange) {
      this.clearTimer();
      this.startTimer();
    }
  }

  private startTimer(): void {
    this.secondsLeft.set(this.totalSeconds);

    this.intervalId = setInterval(() => {
      const next = this.secondsLeft() - 1;

      if (next <= 0) {
        this.secondsLeft.set(0);
        this.tick.emit(0);
        this.clearTimer();
        this.timeUp.emit();
        return;
      }

      this.secondsLeft.set(next);
      this.tick.emit(next);
    }, 1_000);
  }

  private clearTimer(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
