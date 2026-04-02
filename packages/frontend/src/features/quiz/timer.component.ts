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
  styles: [`
    :host {
      display: inline-grid;
      place-items: center;
    }
    svg, .countdown {
      grid-row: 1;
      grid-column: 1;
    }
    svg { transform: rotate(-90deg); }
    .countdown {
      /* Undo the SVG rotation so text reads correctly */
      transform: rotate(0deg);
      font-size: 1.5rem;
      font-weight: 700;
      font-family: monospace;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
  `],
  template: `
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      aria-hidden="true"
      [ngClass]="{ 'animate-timer-pulse': isUrgent() }"
    >
      <!-- Track ring -->
      <circle
        cx="48" cy="48" r="40"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="6"
      />
      <!-- Progress ring — depletes as time runs out -->
      <circle
        cx="48" cy="48" r="40"
        fill="none"
        [attr.stroke]="isUrgent() ? 'var(--neon-red)' : 'var(--neon-cyan)'"
        stroke-width="6"
        stroke-linecap="round"
        [attr.stroke-dasharray]="circumference"
        [attr.stroke-dashoffset]="dashOffset()"
        style="transition: stroke-dashoffset 0.9s linear, stroke 0.3s ease;"
      />
    </svg>

    <span
      class="countdown"
      [style.color]="isUrgent() ? 'var(--neon-red)' : 'var(--neon-cyan)'"
      [style.text-shadow]="isUrgent()
        ? '0 0 10px var(--neon-red), 0 0 30px var(--neon-red)'
        : '0 0 10px var(--neon-cyan), 0 0 30px var(--neon-cyan)'"
      aria-live="polite"
      aria-atomic="true"
      [attr.aria-label]="formattedTime() + ' remaining'"
    >{{ formattedTime() }}</span>
  `,
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

  private readonly destroyRef = inject(DestroyRef);

  readonly secondsLeft = signal<number>(0);

  /** 2πr where r = 40 (matches the SVG circle radius). */
  readonly circumference = 2 * Math.PI * 40; // ≈ 251.33

  /** Shrinks as time elapses — at full time the offset is 0 (full ring visible). */
  readonly dashOffset = computed(() => {
    const ratio = this.secondsLeft() / this.totalSeconds;
    return this.circumference * (1 - ratio);
  });

  readonly isUrgent = computed(() => this.secondsLeft() <= 10);

  readonly formattedTime = computed(() => {
    const secs = this.secondsLeft();
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  });

  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startTimer();
    this.destroyRef.onDestroy(() => this.clearTimer());
  }

  ngOnChanges(changes: SimpleChanges): void {
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
