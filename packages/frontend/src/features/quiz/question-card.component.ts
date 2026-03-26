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
  styles: [`
    :host { display: block; }

    /* ── Card wrapper ───────────────────────────────────────────── */
    .card {
      background-color: var(--bg-card);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.5);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      transition: border-color .25s ease, box-shadow .25s ease;
    }

    /* ── Question text ──────────────────────────────────────────── */
    .question-text {
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.6;
      color: rgba(240,246,252,0.95);
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
    }

    /* ── Options list ───────────────────────────────────────────── */
    .options-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* ── Option button base ─────────────────────────────────────── */
    .option-btn {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.12);
      text-align: left;
      font-size: 0.9rem;
      font-weight: 500;
      background-color: var(--bg-card);
      color: rgba(240,246,252,0.9);
      cursor: pointer;
      transition: border-color .2s, box-shadow .2s, background-color .2s, opacity .2s;
    }
    .option-btn:disabled { cursor: not-allowed; }
    .option-btn:focus-visible {
      outline: 2px solid var(--neon-cyan);
      outline-offset: 3px;
    }

    /* hover only when answerable */
    .option-btn:not([disabled]):not(.option-selected):not(.option-correct):not(.option-wrong):not(.option-dim):hover {
      border-color: rgba(0,245,255,0.45);
      box-shadow: 0 0 14px rgba(0,245,255,0.15);
      background-color: rgba(0,245,255,0.03);
    }

    /* ── Option states ──────────────────────────────────────────── */
    .option-selected {
      border-color: var(--neon-cyan) !important;
      box-shadow: 0 0 12px rgba(0,245,255,0.2);
    }
    .option-correct {
      border-color: var(--neon-green) !important;
      box-shadow: 0 0 16px rgba(57,255,20,0.3);
      color: var(--neon-green);
    }
    .option-wrong {
      border-color: var(--neon-red) !important;
      box-shadow: 0 0 16px rgba(255,7,58,0.3);
      color: var(--neon-red);
    }
    .option-dim {
      border-color: rgba(255,255,255,0.04) !important;
      opacity: 0.3;
    }

    /* ── Letter badge ───────────────────────────────────────────── */
    .badge {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
      transition: background-color .2s, color .2s;
    }
    .badge-default  { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); }
    .badge-selected { background: rgba(0,245,255,0.15);   color: var(--neon-cyan); }
    .badge-correct  { background: rgba(57,255,20,0.15);   color: var(--neon-green); }
    .badge-wrong    { background: rgba(255,7,58,0.15);    color: var(--neon-red); }
    .badge-dim      { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.15); }

    /* ── Option text ────────────────────────────────────────────── */
    .option-text {
      flex: 1;
      line-height: 1.4;
    }

    /* ── Reveal icon ────────────────────────────────────────────── */
    .reveal-icon { flex-shrink: 0; }
  `],
  template: `
    <div class="card">

      <!-- ── Question text ──────────────────────────────────────────── -->
      <h2 class="question-text">{{ question.text }}</h2>

      <!-- ── Option buttons ──────────────────────────────────────────── -->
      <div class="options-list" role="group" aria-label="Answer options">
        @for (option of question.options; track option.text; let i = $index) {
          <button
            type="button"
            class="option-btn"
            [disabled]="isInteractionDisabled()"
            (click)="handleOptionClick(i)"
            [attr.aria-pressed]="selectedIndex === i"
            [attr.aria-label]="optionLabel(i, option.text)"
            [ngClass]="optionClasses(i)"
          >
            <!-- Letter badge -->
            <span class="badge" [ngClass]="badgeClasses(i)">{{ LABELS[i] }}</span>

            <!-- Option text -->
            <span class="option-text">{{ option.text }}</span>

            <!-- Reveal icons -->
            @if (correctIndex !== null) {
              @if (i === correctIndex) {
                <span class="reveal-icon" aria-hidden="true" style="color: var(--neon-green)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                    <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2.2"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              } @else if (i === selectedIndex) {
                <span class="reveal-icon" aria-hidden="true" style="color: var(--neon-red)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                    <path d="m9 9 6 6M15 9l-6 6" stroke="currentColor" stroke-width="2.2"
                          stroke-linecap="round"/>
                  </svg>
                </span>
              }
            }
          </button>
        }
      </div>

    </div>
  `,
})
export class QuestionCardComponent implements OnChanges {
  readonly LABELS = OPTION_LABELS;

  @Input({ required: true }) question!: QuestionForQuiz;
  @Input() selectedIndex: number | null = null;
  @Input() correctIndex: number | null = null;
  @Input() disabled = false;

  @Output() optionSelected = new EventEmitter<number>();

  private readonly _selectedIndex = signal<number | null>(null);
  private readonly _correctIndex = signal<number | null>(null);
  private readonly _disabled = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedIndex']) this._selectedIndex.set(this.selectedIndex);
    if (changes['correctIndex'])  this._correctIndex.set(this.correctIndex);
    if (changes['disabled'])      this._disabled.set(this.disabled);
  }

  readonly isInteractionDisabled = computed(
    () => this._disabled() || this._selectedIndex() !== null
  );

  private getOptionState(index: number): OptionState {
    const selected = this._selectedIndex();
    const correct = this._correctIndex();
    const revealed = correct !== null;

    if (!revealed) {
      return selected === index ? 'selected' : 'default';
    }

    if (index === correct) return 'correct';
    if (index === selected) return 'wrong';
    return 'dim';
  }

  optionClasses(index: number): Record<string, boolean> {
    const state = this.getOptionState(index);
    return {
      'option-selected':              state === 'selected',
      'option-correct animate-correct': state === 'correct',
      'option-wrong animate-wrong':     state === 'wrong',
      'option-dim':                   state === 'dim',
    };
  }

  badgeClasses(index: number): Record<string, boolean> {
    const state = this.getOptionState(index);
    return {
      'badge-default':  state === 'default',
      'badge-selected': state === 'selected',
      'badge-correct':  state === 'correct',
      'badge-wrong':    state === 'wrong',
      'badge-dim':      state === 'dim',
    };
  }

  optionLabel(index: number, text: string): string {
    return `Option ${OPTION_LABELS[index]}: ${text}`;
  }

  handleOptionClick(index: number): void {
    if (this.isInteractionDisabled()) return;
    this.optionSelected.emit(index);
  }
}
