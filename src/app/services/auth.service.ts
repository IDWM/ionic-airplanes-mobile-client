import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth';
import { map, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginDto } from '../interfaces/login-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly baseUrl = environment.apiUrl;

  private readonly currentAuth = signal<Auth | null | undefined>(undefined);

  constructor() {
    this.initializeAuth();
  }

  login(credentials: LoginDto): Observable<Auth> {
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, credentials).pipe(
      map((auth) => {
        this.handleSuccessfulAuth(auth);
        return auth;
      })
    );
  }

  logout(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem('auth');
    this.clearAuthState();
  }

  getCurrentAuth(): Auth | null | undefined {
    return this.currentAuth();
  }

  setCurrentAuth(auth: Auth): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.setItem('auth', JSON.stringify(auth));
    this.currentAuth.set(auth);
  }

  isAuthInitialized(): boolean {
    return this.currentAuth() !== undefined;
  }

  isAuthenticated(): boolean {
    const auth = this.currentAuth();
    return auth !== null && auth !== undefined;
  }

  // Private methods
  private initializeAuth(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const item = localStorage.getItem('auth');
    if (!item) return;

    let storedAuth;

    try {
      storedAuth = JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing stored item for 'auth':`, error);
      return;
    }

    if (storedAuth) {
      this.handleSuccessfulAuth(storedAuth);
    } else {
      this.currentAuth.set(null);
    }
  }

  private handleSuccessfulAuth(auth: Auth): void {
    localStorage.setItem('auth', JSON.stringify(auth));
    this.currentAuth.set(auth);
  }

  private clearAuthState(): void {
    this.currentAuth.set(null);
  }
}
