import {
  Component,
  DestroyRef,
  inject,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import type { Topic } from '@quizapp/shared';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TopicsResponse {
  topics: Topic[];
}

// Augmented topic view-model: maps a topic slug to its neon glow colour.
// Keeping this co-located keeps the mapping close to where it's consumed;
// it's intentionally not in the shared package because it's purely a UI concern.
interface TopicViewModel extends Topic {
  glowColor: string;         // CSS hex for box-shadow / text-shadow
  borderClass: string;       // CSS utility class from styles.css
  textColorStyle: string;    // inline style for topic-name text
}

type FetchState = 'loading' | 'success' | 'error';

// ─── Topic colour map ─────────────────────────────────────────────────────────

const TOPIC_COLORS: Record<string, { glow: string; borderClass: string }> = {
  react:          { glow: '#00f5ff', borderClass: 'border-glow-cyan' },
  angular:        { glow: '#ff00de', borderClass: 'border-glow-pink' },
  typescript:     { glow: '#3178c6', borderClass: 'border-glow-typescript' },
  'system-design': { glow: '#9d00ff', borderClass: 'border-glow-purple' },
};

function toViewModel(topic: Topic): TopicViewModel {
  const colors = TOPIC_COLORS[topic.slug] ?? { glow: '#00f5ff', borderClass: 'border-glow-cyan' };
  return {
    ...topic,
    glowColor: colors.glow,
    borderClass: colors.borderClass,
    textColorStyle: `color: ${colors.glow}; text-shadow: 0 0 10px ${colors.glow}, 0 0 30px ${colors.glow}`,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: [`
    .topic-card {
      background-color: var(--bg-card);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }
    .topic-card:hover {
      transform: scale(1.04);
    }
    .topic-card:hover.react-card {
      border-color: rgba(0,245,255,0.5);
      box-shadow: 0 0 28px rgba(0,245,255,0.25), inset 0 0 12px rgba(0,245,255,0.06);
    }
    .topic-card:hover.angular-card {
      border-color: rgba(255,0,222,0.5);
      box-shadow: 0 0 28px rgba(255,0,222,0.25), inset 0 0 12px rgba(255,0,222,0.06);
    }
    .topic-card:hover.typescript-card {
      border-color: rgba(49,120,198,0.5);
      box-shadow: 0 0 28px rgba(49,120,198,0.25), inset 0 0 12px rgba(49,120,198,0.06);
    }
    .topic-card:hover.system-design-card {
      border-color: rgba(157,0,255,0.5);
      box-shadow: 0 0 28px rgba(157,0,255,0.25), inset 0 0 12px rgba(157,0,255,0.06);
    }

    /* Spinner */
    .spinner {
      width: 48px;
      height: 48px;
      border: 3px solid rgba(0,245,255,0.2);
      border-top-color: var(--neon-cyan);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Nav button base styles */
    .nav-btn {
      padding: 6px 18px;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      transition: opacity 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer;
      border: none;
      outline: none;
    }
    .nav-btn:hover { opacity: 0.85; }
    .nav-btn-outline {
      background: transparent;
      border: 1px solid rgba(0,245,255,0.4);
      color: var(--neon-cyan);
    }
    .nav-btn-outline:hover {
      box-shadow: 0 0 12px rgba(0,245,255,0.3);
    }
    .nav-btn-filled {
      background: var(--neon-cyan);
      color: #030712;
    }
    .nav-btn-filled:hover {
      box-shadow: 0 0 18px rgba(0,245,255,0.5);
    }
    .nav-btn-ghost {
      background: transparent;
      color: var(--text-dim, #8b949e);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .nav-btn-ghost:hover {
      color: #f0f6fc;
      border-color: rgba(255,255,255,0.25);
    }
    .nav-btn-logout {
      background: transparent;
      border: 1px solid rgba(255,7,58,0.4);
      color: var(--neon-red, #ff073a);
    }
    .nav-btn-logout:hover {
      box-shadow: 0 0 12px rgba(255,7,58,0.3);
    }

    /* PLAY label */
    .play-label {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: rgba(255,255,255,0.35);
      transition: color 0.2s ease;
    }
    .topic-card:hover .play-label {
      color: rgba(255,255,255,0.7);
    }

    /* Gradient header accent */
    .header-accent {
      background: linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink));
      height: 2px;
      border-radius: 1px;
      margin: 0 auto;
      width: 80px;
    }
  `],
  template: `
    <!-- ── Page Shell ─────────────────────────────────────────────────── -->
    <div class="min-h-screen" style="background-color: var(--bg-dark)">

      <!-- ── Navigation Bar ───────────────────────────────────────────── -->
      <nav
        style="background-color: rgba(13,17,23,0.85); backdrop-filter: blur(12px);
               border-bottom: 1px solid rgba(255,255,255,0.06);"
        class="sticky top-0 z-50 px-6 py-3 flex items-center justify-between"
      >
        <!-- Logo / wordmark -->
        <span
          class="text-sm font-bold tracking-widest uppercase glow-cyan"
          style="color: var(--neon-cyan)"
        >⚡ QuizApp</span>

        <!-- Auth controls -->
        <div class="flex items-center gap-3">
          @if (isAuthenticated()) {
            <!-- Authenticated state -->
            <button class="nav-btn nav-btn-ghost" routerLink="/analytics">Analytics</button>
            <span
              class="text-sm font-medium"
              style="color: var(--neon-cyan)"
            >{{ currentUser()?.username }}</span>
            <button class="nav-btn nav-btn-logout" (click)="onLogout()">Logout</button>
          } @else {
            <!-- Guest state -->
            <button class="nav-btn nav-btn-outline" routerLink="/login">Login</button>
            <button class="nav-btn nav-btn-filled" routerLink="/signup">Sign Up</button>
          }
        </div>
      </nav>

      <!-- ── Main Content ──────────────────────────────────────────────── -->
      <main class="flex flex-col items-center px-4 pt-16 pb-24">

        <!-- Header -->
        <header class="text-center mb-12 animate-slide-in">
          <h1
            class="text-4xl md:text-5xl font-black uppercase tracking-widest mb-3 glow-cyan"
            style="color: var(--neon-cyan)"
          >⚡ TECH QUIZ SHOWDOWN ⚡</h1>
          <div class="header-accent mb-4"></div>
          <p class="text-base tracking-widest uppercase" style="color: var(--text-dim, #8b949e)">
            Choose your battleground
          </p>
        </header>

        <!-- ── Loading state ───────────────────────────────────────────── -->
        @if (fetchState() === 'loading') {
          <div class="flex flex-col items-center gap-4 mt-8">
            <div class="spinner"></div>
            <p class="text-sm tracking-widest uppercase" style="color: var(--text-dim, #8b949e)">
              Loading topics…
            </p>
          </div>
        }

        <!-- ── Error state ─────────────────────────────────────────────── -->
        @if (fetchState() === 'error') {
          <div
            class="neon-card text-center px-8 py-10 mt-8 max-w-md w-full"
            style="border-color: rgba(255,7,58,0.3); box-shadow: 0 0 20px rgba(255,7,58,0.1)"
          >
            <p class="text-2xl mb-2">⚠️</p>
            <p class="font-semibold mb-1" style="color: var(--neon-red, #ff073a)">
              Failed to load topics
            </p>
            <p class="text-sm mb-6" style="color: var(--text-dim, #8b949e)">
              {{ errorMessage() }}
            </p>
            <button
              class="nav-btn nav-btn-outline"
              (click)="loadTopics()"
            >Retry</button>
          </div>
        }

        <!-- ── Topic grid ──────────────────────────────────────────────── -->
        @if (fetchState() === 'success') {
          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl animate-slide-in"
          >
            @for (topic of topicViewModels(); track topic.id) {
              <button
                class="topic-card p-8 flex flex-col items-center gap-4 text-center"
                [class.react-card]="topic.slug === 'react'"
                [class.angular-card]="topic.slug === 'angular'"
                [class.typescript-card]="topic.slug === 'typescript'"
                [class.system-design-card]="topic.slug === 'system-design'"
                (click)="onTopicSelect(topic)"
                type="button"
              >
                <!-- Icon -->
                <span class="text-6xl leading-none select-none">{{ topic.icon }}</span>

                <!-- Topic name -->
                <span
                  class="text-xl font-bold uppercase tracking-widest"
                  [style]="topic.textColorStyle"
                >{{ topic.name }}</span>

                <!-- Divider -->
                <div
                  class="w-10 h-px"
                  [style]="'background-color: ' + topic.glowColor + '; opacity: 0.4'"
                ></div>

                <!-- PLAY label -->
                <span class="play-label tracking-widest uppercase">▶ PLAY</span>
              </button>
            }
          </div>
        }

      </main>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  // ── DI ───────────────────────────────────────────────────────────────────
  private readonly http        = inject(HttpClient);
  private readonly router      = inject(Router);
  private readonly destroyRef  = inject(DestroyRef);
  readonly authService         = inject(AuthService);

  // ── Auth convenience aliases (expose signals directly for template) ──────
  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser     = this.authService.currentUser;

  // ── Fetch state signals ───────────────────────────────────────────────────
  readonly fetchState    = signal<FetchState>('loading');
  readonly topics        = signal<Topic[]>([]);
  readonly errorMessage  = signal<string>('Something went wrong. Please try again.');

  // ── Derived view-model (only recomputed when topics signal changes) ───────
  // Using computed() here is a micro-optimisation: the mapping runs once per
  // fetch, not on every change-detection cycle.
  readonly topicViewModels = computed<TopicViewModel[]>(() =>
    this.topics().map(toViewModel)
  );

  // ─────────────────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.loadTopics();
  }

  loadTopics(): void {
    this.fetchState.set('loading');
    this.errorMessage.set('Something went wrong. Please try again.');

    // takeUntilDestroyed(this.destroyRef) cancels the HTTP request if the
    // component is destroyed mid-flight (e.g. user navigates away quickly).
    this.http
      .get<TopicsResponse>('/api/topics')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.topics.set(res.topics);
          this.fetchState.set('success');
        },
        error: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : typeof err === 'object' && err !== null && 'message' in err
                ? String((err as { message: unknown }).message)
                : 'Network error. Please check your connection.';
          this.errorMessage.set(message);
          this.fetchState.set('error');
        },
      });
  }

  onTopicSelect(topic: TopicViewModel): void {
    this.router.navigate(['/difficulty'], {
      queryParams: { topic: topic.slug, topicName: topic.name },
    });
  }

  async onLogout(): Promise<void> {
    await this.authService.logout();
  }
}
