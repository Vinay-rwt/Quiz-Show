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

interface TopicsResponse { topics: Topic[]; }

interface TopicViewModel extends Topic {
  glowColor: string;
  borderClass: string;
  textColorStyle: string;
  cardClass: string;
}

type FetchState = 'loading' | 'success' | 'error';

const TOPIC_COLORS: Record<string, { glow: string; borderClass: string; cardClass: string }> = {
  react:           { glow: '#00f5ff', borderClass: 'border-glow-cyan',       cardClass: 'react-card' },
  angular:         { glow: '#ff00de', borderClass: 'border-glow-pink',       cardClass: 'angular-card' },
  typescript:      { glow: '#3178c6', borderClass: 'border-glow-typescript', cardClass: 'typescript-card' },
  'system-design': { glow: '#9d00ff', borderClass: 'border-glow-purple',     cardClass: 'system-design-card' },
  javascript:      { glow: '#f7df1e', borderClass: 'border-glow-yellow',     cardClass: 'javascript-card' },
  python:          { glow: '#4ade80', borderClass: 'border-glow-green',      cardClass: 'python-card' },
  csharp:          { glow: '#c084fc', borderClass: 'border-glow-violet',     cardClass: 'csharp-card' },
  dotnet:          { glow: '#818cf8', borderClass: 'border-glow-indigo',     cardClass: 'dotnet-card' },
};

function toViewModel(topic: Topic): TopicViewModel {
  const c = TOPIC_COLORS[topic.slug] ?? { glow: '#00f5ff', borderClass: 'border-glow-cyan', cardClass: '' };
  return {
    ...topic,
    glowColor: c.glow,
    borderClass: c.borderClass,
    cardClass: c.cardClass,
    textColorStyle: `color:${c.glow};text-shadow:0 0 10px ${c.glow},0 0 30px ${c.glow}`,
  };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: [`
    /* ── Page ────────────────────────────────────────────────────────── */
    .page {
      min-height: 100vh;
      background-color: var(--bg-dark);
      background-image:
        radial-gradient(ellipse at 15% 40%, rgba(0,245,255,.04) 0%, transparent 55%),
        radial-gradient(ellipse at 85% 15%, rgba(157,0,255,.035) 0%, transparent 55%),
        radial-gradient(ellipse at 55% 85%, rgba(255,0,222,.025) 0%, transparent 55%);
    }

    /* ── Navigation ──────────────────────────────────────────────────── */
    .nav {
      position: sticky;
      top: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 32px;
      background: rgba(13,17,23,.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255,255,255,.06);
    }
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      outline: none;
    }
    .nav-logo-text {
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: .85rem;
      font-weight: 700;
      letter-spacing: .15em;
      text-transform: uppercase;
      color: var(--neon-cyan);
      text-shadow: 0 0 12px rgba(0,245,255,.5);
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .nav-btn {
      padding: 7px 18px;
      border-radius: 8px;
      font-size: .8rem;
      font-weight: 600;
      letter-spacing: .04em;
      transition: all .18s ease;
      cursor: pointer;
      border: none;
      outline: none;
    }
    .nav-btn-outline { background:transparent; border:1px solid rgba(0,245,255,.35); color:var(--neon-cyan); }
    .nav-btn-outline:hover { background:rgba(0,245,255,.06); box-shadow:0 0 14px rgba(0,245,255,.25); }
    .nav-btn-filled  { background:var(--neon-cyan); color:#030712; font-weight:700; }
    .nav-btn-filled:hover { box-shadow:0 0 20px rgba(0,245,255,.55); filter:brightness(1.05); }
    .nav-btn-ghost   { background:transparent; color:var(--text-dim,#8b949e); border:1px solid rgba(255,255,255,.1); }
    .nav-btn-ghost:hover { color:#f0f6fc; border-color:rgba(255,255,255,.22); }
    .nav-btn-logout  { background:transparent; border:1px solid rgba(255,7,58,.35); color:var(--neon-red,#ff073a); }
    .nav-btn-logout:hover { background:rgba(255,7,58,.06); box-shadow:0 0 14px rgba(255,7,58,.25); }
    .user-badge {
      font-size:.75rem; font-weight:600; padding:5px 12px; border-radius:9999px;
      color:var(--neon-cyan); background:rgba(0,245,255,.08); border:1px solid rgba(0,245,255,.2);
    }

    /* ── Main content area ───────────────────────────────────────────── */
    .main {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 72px 24px 96px;
    }

    /* ── Header ──────────────────────────────────────────────────────── */
    .header {
      text-align: center;
      margin-bottom: 56px;
      animation: slide-in-up .4s cubic-bezier(.16,1,.3,1) forwards;
    }
    .eyebrow {
      display: block;
      font-size: .7rem;
      font-weight: 600;
      letter-spacing: .28em;
      text-transform: uppercase;
      color: var(--neon-cyan);
      opacity: .65;
      margin-bottom: 18px;
    }
    .main-title {
      display: block;
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 700;
      letter-spacing: -.01em;
      line-height: 1.1;
      background: linear-gradient(135deg, var(--neon-cyan) 0%, #a78bfa 50%, var(--neon-pink) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 20px;
    }
    .header-accent {
      background: linear-gradient(90deg, transparent, var(--neon-cyan), #a78bfa, var(--neon-pink), transparent);
      height: 1px;
      width: 160px;
      margin: 0 auto 20px;
      opacity: .7;
    }
    .subtitle {
      display: block;
      font-size: .8rem;
      font-weight: 500;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--text-dim, #8b949e);
    }

    /* ── Topic grid ──────────────────────────────────────────────────── */
    .topic-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      width: 100%;
      max-width: 640px;
    }
    @media (max-width: 520px) {
      .topic-grid { grid-template-columns: 1fr; }
    }

    /* ── Topic card ──────────────────────────────────────────────────── */
    .topic-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      padding: 36px 24px;
      text-align: center;
      background-color: var(--bg-card);
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 20px;
      cursor: pointer;
      overflow: hidden;
      position: relative;
      box-shadow: 0 4px 24px rgba(0,0,0,.5);
      transition: transform .25s cubic-bezier(.16,1,.3,1), border-color .25s, box-shadow .25s;
    }
    .topic-card::before {
      content:''; position:absolute; top:0; left:0; right:0;
      height:2px; border-radius:20px 20px 0 0; opacity:0; transition:opacity .25s;
    }
    .topic-card:hover { transform: translateY(-4px) scale(1.01); }
    .topic-card:hover::before { opacity:1; }

    .react-card::before         { background:linear-gradient(90deg,transparent,#00f5ff,transparent); }
    .angular-card::before       { background:linear-gradient(90deg,transparent,#ff00de,transparent); }
    .typescript-card::before    { background:linear-gradient(90deg,transparent,#3178c6,transparent); }
    .system-design-card::before { background:linear-gradient(90deg,transparent,#9d00ff,transparent); }
    .javascript-card::before    { background:linear-gradient(90deg,transparent,#f7df1e,transparent); }
    .python-card::before        { background:linear-gradient(90deg,transparent,#4ade80,transparent); }
    .csharp-card::before        { background:linear-gradient(90deg,transparent,#c084fc,transparent); }
    .dotnet-card::before        { background:linear-gradient(90deg,transparent,#818cf8,transparent); }

    .topic-card:hover.react-card         { border-color:rgba(0,245,255,.4);   box-shadow:0 8px 40px rgba(0,245,255,.2),0 4px 24px rgba(0,0,0,.5); }
    .topic-card:hover.angular-card       { border-color:rgba(255,0,222,.4);   box-shadow:0 8px 40px rgba(255,0,222,.2),0 4px 24px rgba(0,0,0,.5); }
    .topic-card:hover.typescript-card    { border-color:rgba(49,120,198,.4);  box-shadow:0 8px 40px rgba(49,120,198,.2),0 4px 24px rgba(0,0,0,.5); }
    .topic-card:hover.system-design-card { border-color:rgba(157,0,255,.4);   box-shadow:0 8px 40px rgba(157,0,255,.2),0 4px 24px rgba(0,0,0,.5); }
    .topic-card:hover.javascript-card    { border-color:rgba(247,223,30,.4);  box-shadow:0 8px 40px rgba(247,223,30,.2),0 4px 24px rgba(0,0,0,.5); }
    .topic-card:hover.python-card        { border-color:rgba(74,222,128,.4);  box-shadow:0 8px 40px rgba(74,222,128,.2),0 4px 24px rgba(0,0,0,.5); }
    .topic-card:hover.csharp-card        { border-color:rgba(192,132,252,.4); box-shadow:0 8px 40px rgba(192,132,252,.2),0 4px 24px rgba(0,0,0,.5); }
    .topic-card:hover.dotnet-card        { border-color:rgba(129,140,248,.4); box-shadow:0 8px 40px rgba(129,140,248,.2),0 4px 24px rgba(0,0,0,.5); }

    /* ── Icon container ──────────────────────────────────────────────── */
    .topic-icon-wrap {
      width:72px; height:72px; border-radius:18px;
      display:flex; align-items:center; justify-content:center; transition:box-shadow .25s;
    }
    .react-card         .topic-icon-wrap { background:rgba(0,245,255,.08);   border:1px solid rgba(0,245,255,.15); }
    .angular-card       .topic-icon-wrap { background:rgba(255,0,222,.08);   border:1px solid rgba(255,0,222,.15); }
    .typescript-card    .topic-icon-wrap { background:rgba(49,120,198,.08);  border:1px solid rgba(49,120,198,.15); }
    .system-design-card .topic-icon-wrap { background:rgba(157,0,255,.08);   border:1px solid rgba(157,0,255,.15); }
    .javascript-card    .topic-icon-wrap { background:rgba(247,223,30,.08);  border:1px solid rgba(247,223,30,.15); }
    .python-card        .topic-icon-wrap { background:rgba(74,222,128,.08);  border:1px solid rgba(74,222,128,.15); }
    .csharp-card        .topic-icon-wrap { background:rgba(192,132,252,.08); border:1px solid rgba(192,132,252,.15); }
    .dotnet-card        .topic-icon-wrap { background:rgba(129,140,248,.08); border:1px solid rgba(129,140,248,.15); }

    /* ── Topic name ──────────────────────────────────────────────────── */
    .topic-name {
      font-family: var(--font-heading, 'Space Grotesk', system-ui);
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: .1em;
      text-transform: uppercase;
    }
    .topic-divider { width:32px; height:1px; border-radius:1px; opacity:.35; }

    /* ── Play row ────────────────────────────────────────────────────── */
    .play-row {
      display:flex; align-items:center; gap:6px;
      font-size:.7rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
      color:rgba(255,255,255,.3); transition:color .2s,gap .2s;
    }
    .topic-card:hover .play-row { color:rgba(255,255,255,.75); gap:10px; }

    /* ── Loading & Error states ──────────────────────────────────────── */
    .state-center { display:flex; flex-direction:column; align-items:center; gap:16px; margin-top:32px; }
    .spinner { width:40px; height:40px; border:2px solid rgba(0,245,255,.15); border-top-color:var(--neon-cyan); border-radius:50%; animation:spin .75s linear infinite; }
    .error-card { background-color:var(--bg-card); border:1px solid rgba(255,7,58,.25); border-radius:16px; padding:40px 32px; text-align:center; max-width:380px; width:100%; box-shadow:0 0 30px rgba(255,7,58,.08); }

    /* ── Stagger entrance ─────────────────────────────────────────────── */
    .stagger-1 { animation:slide-in-up .4s .05s cubic-bezier(.16,1,.3,1) both; }
    .stagger-2 { animation:slide-in-up .4s .12s cubic-bezier(.16,1,.3,1) both; }
    .stagger-3 { animation:slide-in-up .4s .19s cubic-bezier(.16,1,.3,1) both; }
    .stagger-4 { animation:slide-in-up .4s .26s cubic-bezier(.16,1,.3,1) both; }
    .stagger-5 { animation:slide-in-up .4s .33s cubic-bezier(.16,1,.3,1) both; }
    .stagger-6 { animation:slide-in-up .4s .40s cubic-bezier(.16,1,.3,1) both; }
    .stagger-7 { animation:slide-in-up .4s .47s cubic-bezier(.16,1,.3,1) both; }
    .stagger-8 { animation:slide-in-up .4s .54s cubic-bezier(.16,1,.3,1) both; }

    @keyframes spin { to { transform:rotate(360deg); } }
    @keyframes slide-in-up {
      from { transform:translateY(20px); opacity:0; }
      to   { transform:translateY(0); opacity:1; }
    }
  `],
  template: `
    <div class="page">

      <!-- ── Navigation ─────────────────────────────────────────────── -->
      <nav class="nav">
        <a routerLink="/home" class="nav-logo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"
               style="color:var(--neon-cyan);filter:drop-shadow(0 0 6px var(--neon-cyan))">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="nav-logo-text">QuizApp</span>
        </a>

        <div class="nav-actions">
          @if (isAuthenticated()) {
            <button class="nav-btn nav-btn-ghost" routerLink="/analytics">Analytics</button>
            <span class="user-badge">{{ currentUser()?.username }}</span>
            <button class="nav-btn nav-btn-logout" (click)="onLogout()">Sign Out</button>
          } @else {
            <button class="nav-btn nav-btn-ghost" routerLink="/login">Log In</button>
            <button class="nav-btn nav-btn-filled" routerLink="/signup">Sign Up</button>
          }
        </div>
      </nav>

      <!-- ── Main ───────────────────────────────────────────────────── -->
      <main class="main">

        <!-- Header -->
        <header class="header">
          <span class="eyebrow">Test Your Knowledge</span>
          <span class="main-title">Tech Quiz Showdown</span>
          <div class="header-accent"></div>
          <span class="subtitle">Choose your battleground</span>
        </header>

        <!-- Loading -->
        @if (fetchState() === 'loading') {
          <div class="state-center">
            <div class="spinner"></div>
            <p style="color:var(--text-dim);font-size:.75rem;letter-spacing:.15em;text-transform:uppercase">
              Loading topics…
            </p>
          </div>
        }

        <!-- Error -->
        @if (fetchState() === 'error') {
          <div class="state-center">
            <div class="error-card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                   style="color:var(--neon-red);display:block;margin:0 auto 12px">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <p style="color:var(--neon-red);font-weight:600;margin-bottom:6px">Failed to load topics</p>
              <p style="color:var(--text-dim);font-size:.85rem;margin-bottom:24px">{{ errorMessage() }}</p>
              <button class="nav-btn nav-btn-outline" (click)="loadTopics()">Try Again</button>
            </div>
          </div>
        }

        <!-- Topic grid -->
        @if (fetchState() === 'success') {
          <div class="topic-grid">
            @for (topic of topicViewModels(); track topic.id; let i = $index) {
              <button
                class="topic-card"
                [class.react-card]="topic.slug === 'react'"
                [class.angular-card]="topic.slug === 'angular'"
                [class.typescript-card]="topic.slug === 'typescript'"
                [class.system-design-card]="topic.slug === 'system-design'"
                [class.javascript-card]="topic.slug === 'javascript'"
                [class.python-card]="topic.slug === 'python'"
                [class.csharp-card]="topic.slug === 'csharp'"
                [class.dotnet-card]="topic.slug === 'dotnet'"
                [class.stagger-1]="i === 0"
                [class.stagger-2]="i === 1"
                [class.stagger-3]="i === 2"
                [class.stagger-4]="i === 3"
                [class.stagger-5]="i === 4"
                [class.stagger-6]="i === 5"
                [class.stagger-7]="i === 6"
                [class.stagger-8]="i === 7"
                (click)="onTopicSelect(topic)"
                type="button"
              >
                <!-- SVG icon per slug -->
                <div class="topic-icon-wrap" [style.color]="topic.glowColor">
                  @switch (topic.slug) {
                    @case ('react') {
                      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <circle cx="24" cy="24" r="4" fill="currentColor"/>
                        <ellipse cx="24" cy="24" rx="20" ry="7" stroke="currentColor" stroke-width="2" fill="none"/>
                        <ellipse cx="24" cy="24" rx="20" ry="7" stroke="currentColor" stroke-width="2" fill="none" transform="rotate(60 24 24)"/>
                        <ellipse cx="24" cy="24" rx="20" ry="7" stroke="currentColor" stroke-width="2" fill="none" transform="rotate(-60 24 24)"/>
                      </svg>
                    }
                    @case ('angular') {
                      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <path d="M24 4L7 10.5l2.6 22.4L24 44l14.4-11.1L41 10.5z" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
                        <path d="M17 31l4-10h6l4 10M19 27h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    }
                    @case ('typescript') {
                      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <rect x="5" y="5" width="38" height="38" rx="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
                        <path d="M14 24h9M18 19v10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                        <path d="M28 19h7M31 19v10M31 29h6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                      </svg>
                    }
                    @case ('system-design') {
                      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <circle cx="24" cy="10" r="5" stroke="currentColor" stroke-width="2.5" fill="none"/>
                        <circle cx="10" cy="36" r="5" stroke="currentColor" stroke-width="2.5" fill="none"/>
                        <circle cx="38" cy="36" r="5" stroke="currentColor" stroke-width="2.5" fill="none"/>
                        <line x1="24" y1="15" x2="12" y2="31" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <line x1="24" y1="15" x2="36" y2="31" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <line x1="15" y1="36" x2="33" y2="36" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 2.5"/>
                      </svg>
                    }
                    @case ('javascript') {
                      <!-- JS badge shape -->
                      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <rect x="5" y="5" width="38" height="38" rx="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
                        <path d="M16 34c0 3 1.8 4.5 4.5 4.5s4.5-1.8 4.5-5V20h-3v13.5c0 1.5-.6 2-1.5 2s-1.3-.6-1.8-1.5L16 34z" fill="currentColor"/>
                        <path d="M29 33.5c.7 1.2 1.8 2 3.5 2 1.5 0 2.8-.8 2.8-2.2 0-1.5-1-2-2.5-2.7l-.8-.3c-2.3-1-3.8-2.3-3.8-4.8 0-2.4 1.8-4.2 4.7-4.2 2 0 3.5.7 4.5 2.5l-2.5 1.6c-.5-1-1-1.5-2-1.5-1 0-1.6.6-1.6 1.4 0 1 .6 1.4 2 2l.8.4c2.7 1.2 4.2 2.4 4.2 5 0 2.8-2.2 4.5-5.2 4.5-2.9 0-4.8-1.5-5.7-3.4L29 33.5z" fill="currentColor"/>
                      </svg>
                    }
                    @case ('python') {
                      <!-- Python snake-like interlock -->
                      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <path d="M24 6c-6 0-10 2.5-10 6v4h10v2H10c-3.5 0-7 3-7 8s3 8 7 8h3v-5c0-3.5 3.5-6 8-6h8c4 0 7-2.5 7-6V12c0-3.5-3.5-6-12-6z" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linejoin="round"/>
                        <path d="M24 42c6 0 10-2.5 10-6v-4H24v-2h14c3.5 0 7-3 7-8s-3-8-7-8h-3v5c0 3.5-3.5 6-8 6h-8c-4 0-7 2.5-7 6v6c0 3.5 3.5 5 12 5z" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linejoin="round"/>
                        <circle cx="19" cy="15" r="1.5" fill="currentColor"/>
                        <circle cx="29" cy="33" r="1.5" fill="currentColor"/>
                      </svg>
                    }
                    @case ('csharp') {
                      <!-- C# hash grid -->
                      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <path d="M8 17h32M8 31h32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                        <path d="M17 8v32M31 8v32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                        <text x="24" y="27" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" font-family="monospace">C#</text>
                      </svg>
                    }
                    @case ('dotnet') {
                      <!-- .NET diamond -->
                      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2.5" fill="none"/>
                        <path d="M12 24h6M30 24h6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                        <circle cx="18" cy="24" r="2" fill="currentColor"/>
                        <text x="24" y="28" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor" font-family="monospace">.NET</text>
                      </svg>
                    }
                    @default {
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    }
                  }
                </div>

                <span class="topic-name" [style]="topic.textColorStyle">{{ topic.name }}</span>

                <div class="topic-divider" [style.background-color]="topic.glowColor"></div>

                <div class="play-row">
                  <span>Play</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8"
                          stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </button>
            }
          </div>
        }

      </main>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  private readonly http       = inject(HttpClient);
  private readonly router     = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly authService        = inject(AuthService);

  readonly isAuthenticated = this.authService.isAuthenticated;
  readonly currentUser     = this.authService.currentUser;

  readonly fetchState   = signal<FetchState>('loading');
  readonly topics       = signal<Topic[]>([]);
  readonly errorMessage = signal<string>('Something went wrong. Please try again.');

  readonly topicViewModels = computed<TopicViewModel[]>(() =>
    this.topics().map(toViewModel)
  );

  ngOnInit(): void { this.loadTopics(); }

  loadTopics(): void {
    this.fetchState.set('loading');
    this.errorMessage.set('Something went wrong. Please try again.');
    this.http
      .get<TopicsResponse>('/api/topics')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next:  (res) => { this.topics.set(res.topics); this.fetchState.set('success'); },
        error: (err: unknown) => {
          const message =
            err instanceof Error ? err.message
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

  async onLogout(): Promise<void> { await this.authService.logout(); }
}
