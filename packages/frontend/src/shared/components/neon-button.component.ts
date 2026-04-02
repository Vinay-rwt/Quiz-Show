import { Component, Input } from '@angular/core';

type ButtonVariant = 'cyan' | 'pink' | 'purple' | 'yellow' | 'ghost';

@Component({
  selector: 'app-neon-button',
  standalone: true,
  styles: [`
    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 24px;
      border-radius: 8px;
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      cursor: pointer;
      background: transparent;
      transition: background-color .2s, box-shadow .2s, border-color .2s, color .2s, opacity .2s;
      white-space: nowrap;
    }
    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    button:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 3px;
    }

    /* ── Variants ────────────────────────────────────────────────── */
    .btn-cyan {
      border: 1px solid var(--neon-cyan);
      color: var(--neon-cyan);
    }
    .btn-cyan:not(:disabled):hover {
      background-color: rgba(0,245,255,0.1);
      box-shadow: 0 0 16px rgba(0,245,255,0.4);
    }

    .btn-pink {
      border: 1px solid var(--neon-pink);
      color: var(--neon-pink);
    }
    .btn-pink:not(:disabled):hover {
      background-color: rgba(255,0,222,0.1);
      box-shadow: 0 0 16px rgba(255,0,222,0.4);
    }

    .btn-purple {
      border: 1px solid var(--neon-purple);
      color: var(--neon-purple);
    }
    .btn-purple:not(:disabled):hover {
      background-color: rgba(157,0,255,0.1);
      box-shadow: 0 0 16px rgba(157,0,255,0.4);
    }

    .btn-yellow {
      border: 1px solid var(--neon-yellow);
      color: var(--neon-yellow);
    }
    .btn-yellow:not(:disabled):hover {
      background-color: rgba(255,215,0,0.1);
      box-shadow: 0 0 16px rgba(255,215,0,0.4);
    }

    .btn-ghost {
      border: 1px solid rgba(255,255,255,0.2);
      color: rgba(255,255,255,0.6);
    }
    .btn-ghost:not(:disabled):hover {
      border-color: rgba(255,255,255,0.4);
      color: #f0f6fc;
    }
  `],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class]="'btn-' + variant"
    >
      <ng-content />
    </button>
  `,
})
export class NeonButtonComponent {
  @Input() variant: ButtonVariant = 'cyan';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
}
