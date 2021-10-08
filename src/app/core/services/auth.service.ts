import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private IS_AUTHENTICATED = 'IS_AUTHENTICATED';

  constructor(private router: Router) {}

  public authenticate(email: string, password: string): boolean {
    let isValidCredentials =
      email === 'admin@teste.com' && password === 'admin';

    if (isValidCredentials) {
      localStorage.setItem(
        this.IS_AUTHENTICATED,
        JSON.stringify(`${isValidCredentials}`)
      );
    }

    return isValidCredentials;
  }

  public signOut(): void {
    const isUserAuthenticated = localStorage.getItem(this.IS_AUTHENTICATED);
    if (!isUserAuthenticated) return;

    localStorage.removeItem(this.IS_AUTHENTICATED);

    this.router.navigate(['/signin']);
  }

  get isAuthenticated(): boolean {
    const value = localStorage.getItem(this.IS_AUTHENTICATED);
    if (!value) return false;
    return !!JSON.parse(value);
  }
}
