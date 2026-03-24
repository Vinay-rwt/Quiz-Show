import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Functional interceptor (Angular 15+ style).
// Two responsibilities:
// 1. Prefix all relative API paths with the backend base URL (from environment)
// 2. Set withCredentials: true so the browser sends the HttpOnly JWT cookie
//
// In development: environment.apiBase = 'http://localhost:3001'
// In production:  environment.apiBase = '' (same-origin reverse proxy)
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Only transform relative paths starting with /api — leaves external URLs alone
  if (req.url.startsWith('/api')) {
    const cloned = req.clone({
      url: `${environment.apiBase}${req.url}`,
      withCredentials: true,
    });
    return next(cloned);
  }
  return next(req);
};
