import {
  ApplicationConfig,
  APP_INITIALIZER,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules, withRouterConfig } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { apiInterceptor } from '../core/interceptors/api.interceptor';
import { AuthService } from '../core/services/auth.service';

// APP_INITIALIZER: blocks Angular's first render until checkSession() resolves.
// Without this, guards would run before auth state is known, causing a flash
// of unauthenticated content on protected routes (e.g. /analytics).
function initAuth(): () => Promise<void> {
  const auth = inject(AuthService);
  return () => auth.checkSession();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Preloads all lazy-loaded route bundles after the first paint —
      // so navigating to /quiz or /analytics feels instant.
      withPreloading(PreloadAllModules),
      // Enables the `title` property on each route definition to update
      // document.title automatically on navigation.
      withRouterConfig({ resolveNavigationPromiseOnError: true }),
    ),
    provideHttpClient(
      withFetch(),          // Uses native fetch API (better with esbuild/SSR)
      withInterceptors([apiInterceptor]),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      multi: true,
    },
  ],
};
