import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  styles: [`
    .wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .spinner {
      border-radius: 50%;
      border: 2px solid rgba(0,245,255,0.2);
      border-top-color: var(--neon-cyan);
      animation: spin .7s linear infinite;
    }
    .sm   { width: 24px;  height: 24px; }
    .md   { width: 40px;  height: 40px; }
    .full { width: 64px;  height: 64px; }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
  template: `
    <div class="wrap" [style.height]="size === 'full' ? '100vh' : 'auto'">
      <div class="spinner" [class]="size"></div>
    </div>
  `,
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'full' = 'md';
}
