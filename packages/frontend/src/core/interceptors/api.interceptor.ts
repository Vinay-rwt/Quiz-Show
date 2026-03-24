import { HttpInterceptorFn } from '@angular/common/http';

const API_BASE = 'http://localhost:3001';

// Functional interceptor (Angular 15+ style).
// Two responsibilities:
// 1. Prefix all relative API paths with the backend base URL
// 2. Set withCredentials: true so the browser sends the HttpOnly JWT cookie
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Only transform relative paths starting with /api — leaves external URLs alone
  if (req.url.startsWith('/api')) {
    const cloned = req.clone({
      url: `${API_BASE}${req.url}`,
      withCredentials: true,
    });
    return next(cloned);
  }
  return next(req);
};
