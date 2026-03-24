import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      class="flex items-center justify-center"
      [style.height]="size === 'full' ? '100vh' : 'auto'"
    >
      <div
        class="rounded-full border-2 border-[#00f5ff]/20 border-t-[#00f5ff] animate-spin"
        [ngClass]="{
          'w-6 h-6':   size === 'sm',
          'w-10 h-10': size === 'md',
          'w-16 h-16': size === 'full'
        }"
      ></div>
    </div>
  `,
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'full' = 'md';
}
