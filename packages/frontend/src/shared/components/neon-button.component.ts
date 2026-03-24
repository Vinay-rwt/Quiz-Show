import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'cyan' | 'pink' | 'purple' | 'yellow' | 'ghost';

@Component({
  selector: 'app-neon-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="buttonClasses"
      class="relative px-6 py-3 rounded-lg font-semibold text-sm tracking-wide
             transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#030712]"
    >
      <ng-content />
    </button>
  `,
})
export class NeonButtonComponent {
  @Input() variant: ButtonVariant = 'cyan';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;

  get buttonClasses(): Record<string, boolean> {
    return {
      // Cyan
      'bg-transparent border border-[#00f5ff] text-[#00f5ff] hover:bg-[#00f5ff]/10 hover:shadow-[0_0_16px_#00f5ff] focus:ring-[#00f5ff]':
        this.variant === 'cyan',
      // Pink
      'bg-transparent border border-[#ff00de] text-[#ff00de] hover:bg-[#ff00de]/10 hover:shadow-[0_0_16px_#ff00de] focus:ring-[#ff00de]':
        this.variant === 'pink',
      // Purple
      'bg-transparent border border-[#9d00ff] text-[#9d00ff] hover:bg-[#9d00ff]/10 hover:shadow-[0_0_16px_#9d00ff] focus:ring-[#9d00ff]':
        this.variant === 'purple',
      // Yellow
      'bg-transparent border border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700]/10 hover:shadow-[0_0_16px_#ffd700] focus:ring-[#ffd700]':
        this.variant === 'yellow',
      // Ghost
      'bg-transparent border border-white/20 text-white/60 hover:border-white/40 hover:text-white focus:ring-white/40':
        this.variant === 'ghost',
    };
  }
}
