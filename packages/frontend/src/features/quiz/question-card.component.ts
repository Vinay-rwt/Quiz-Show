import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  computed,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { QuestionForQuiz } from '@quizapp/shared';

/** Labels shown on each option button. */
const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const;

/** All possible visual states for a single option button. */
type OptionState =
  | 'default'    // No interaction yet
  | 'selected'   // User selected this before reveal
  | 'correct'    // Revealed: this is the correct answer
  | 'wrong'      // Revealed: user picked this but it is wrong
  | 'dim';       // Revealed: neither selected nor correct — fade out

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="neon-card animate-slide-in p-6 flex flex-col gap-6">

      <!-- ── Question text ──────────────────────────────────────────────── -->
      <h2 class="text-xl sm:text-2xl font-semibold leading-snug text-white/95">
        {{ question.text }}
      </h2>

      <!-- ── Option buttons ────────────────────────────────────────────── -->
      <div class="flex flex-col gap-3" role="group" aria-label="Answer options">
        @for (option of question.options; track option.text; let i = $index) {
          <button
            type="button"
            [disabled]="isInteractionDisabled()"
            (click)="handleOptionClick(i)"
            [attr.aria-pressed]="selectedIndex === i"
            [attr.aria-label]="optionLabel(i, option.text)"
            [ngClass]="optionClasses(i)"
            class="
              relative w-full flex items-center gap-4
              px-4 py-3 rounded-xl
              border text-left
              font-medium text-sm sm:text-base
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--neon-cyan]
              disabled:cursor-not-allowed
            "
          >
            <!-- Letter badge -->
            <span
              class="
                flex-shrink-0 w-8 h-8 rounded-full
                flex items-center justify-center
                text-xs font-bold
                transition-colors duration-200
              "
              [ngClass]="badgeClasses(i)"
            >
              {{ LABELS[i] }}
            </span>

            <!-- Option text -->
            <span class="flex-1">{{ option.text }}</span>

            <!-- Reveal icons -->
            @if (correctIndex !== null) {
              @if (i === correctIndex) {
                <span class="flex-shrink-0 text-[--neon-green] text-lg" aria-hidden="true">✓</span>
              } @else if (i === selectedIndex) {
                <span class="flex-shrink-0 text-[--neon-red] text-lg" aria-hidden="true">✗</span>
              }
            }
          </button>
        }
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }

    /* Hover glow — only when the question is still answerable */
    button:not([disabled]):not(.option-selected):not(.option-correct):not(.option-wrong):not(.option-dim):hover {
      border-color: rgba(0, 245, 255, 0.5);
      box-shadow: 0 0 12px rgba(0, 245, 255, 0.2);
    }

    /* Correct state */
    .option-correct {
      border-color: var(--neon-green) !important;
      box-shadow: 0 0 14px rgba(57, 255, 20, 0.35);
      color: var(--neon-green);
    }

    /* Wrong (selected but incorrect) */
    .option-wrong {
      border-color: var(--neon-red) !important;
      box-shadow: 0 0 14px rgba(255, 7, 58, 0.35);
      color: var(--neon-red);
    }

    /* Dim (unselected, not correct, after reveal) */
    .option-dim {
      border-color: rgba(255, 255, 255, 0.05) !important;
      opacity: 0.35;
    }

    /* Selected (before reveal) */
    .option-selected {
      border-color: var(--neon-cyan) !important;
      box-shadow: 0 0 10px rgba(0, 245, 255, 0.25);
    }
  `],
})
export class QuestionCardComponent implements OnChanges {
  // ── Public constant exposed to the template ──────────────────────────────
  readonly LABELS = OPTION_LABELS;

  // ── Inputs ────────────────────────────────────────────────────────────────
  /** The question to display (from @quizapp/shared). */
  @Input({ required: true }) question!: QuestionForQuiz;

  /**
   * Index of the option the user has selected.
   * `null` means the user has not yet answered.
   */
  @Input() selectedIndex: number | null = null;

  /**
   * Index of the correct answer.
   * `null` until the host reveals the answer after submission.
   */
  @Input() correctIndex: number | null = null;

  /**
   * When `true`, all option buttons are disabled (e.g. advancing to next question).
   */
  @Input() disabled = false;

  // ── Output ────────────────────────────────────────────────────────────────
  /** Emits the zero-based index of the option the user chose. */
  @Output() optionSelected = new EventEmitter<number>();

  // ── Internal signals ──────────────────────────────────────────────────────
  private readonly _selectedIndex = signal<number | null>(null);
  private readonly _correctIndex = signal<number | null>(null);
  private readonly _disabled = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedIndex']) {
      this._selectedIndex.set(this.selectedIndex);
    }
    if (changes['correctIndex']) {
      this._correctIndex.set(this.correctIndex);
    }
    if (changes['disabled']) {
      this._disabled.set(this.disabled);
    }
  }

  // ── Derived state ─────────────────────────────────────────────────────────

  /**
   * Interaction is disabled when:
   * - the host sets `disabled=true`, OR
   * - the user has already selected an answer (prevent double-click)
   */
  readonly isInteractionDisabled = computed(
    () => this._disabled() || this._selectedIndex() !== null
  );

  // ── State computation helpers ─────────────────────────────────────────────

  /** Compute the semantic state for a given option index. */
  private getOptionState(index: number): OptionState {
    const selected = this._selectedIndex();
    const correct = this._correctIndex();
    const revealed = correct !== null;

    if (!revealed) {
      return selected === index ? 'selected' : 'default';
    }

    // Answer has been revealed
    if (index === correct) return 'correct';
    if (index === selected) return 'wrong';
    return 'dim';
  }

  /** Tailwind + custom CSS class map for the option button element. */
  optionClasses(index: number): Record<string, boolean> {
    const state = this.getOptionState(index);
    return {
      // Base colours
      'bg-[#0d1117]': true,
      'text-white': state === 'default' || state === 'selected',
      'border-white/20': state === 'default',

      // State-driven classes
      'option-default': state === 'default',
      'option-selected': state === 'selected',
      'option-correct animate-correct': state === 'correct',
      'option-wrong animate-wrong': state === 'wrong',
      'option-dim': state === 'dim',
    };
  }

  /** Class map for the circular letter badge inside each button. */
  badgeClasses(index: number): Record<string, boolean> {
    const state = this.getOptionState(index);
    return {
      'bg-white/10 text-white/70': state === 'default',
      'bg-[--neon-cyan]/20 text-[--neon-cyan]': state === 'selected',
      'bg-[--neon-green]/20 text-[--neon-green]': state === 'correct',
      'bg-[--neon-red]/20 text-[--neon-red]': state === 'wrong',
      'bg-white/5 text-white/20': state === 'dim',
    };
  }

  /** Accessible label for screen readers (e.g. "Option A: Paris"). */
  optionLabel(index: number, text: string): string {
    return `Option ${OPTION_LABELS[index]}: ${text}`;
  }

  // ── Event handling ────────────────────────────────────────────────────────

  handleOptionClick(index: number): void {
    if (this.isInteractionDisabled()) return;
    this.optionSelected.emit(index);
  }
}
