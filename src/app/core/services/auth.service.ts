import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private IS_AUTHENTICATED = 'IS_AUTHENTICATED';

  constructor(private router: Router, private http: HttpClient) {}

  public async authenticate(email: string, password: string): Promise<boolean> {
    if (email === '' || password === '') return false;

    var response = await this.http
      .post(
        `https://localhost:44351/api/v1/User/Login`,
        { username: email, password: password },
        {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
          }),
        }
      )
      .toPromise();

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

  public getInfo(userId?: string): Observable<any> {
    if(!userId) return of(null);
    return this.http.get(`https://localhost:44351/api/v1/User?userId=${userId}`);
  }

  get isAuthenticated(): boolean {
    const value = localStorage.getItem(this.IS_AUTHENTICATED);
    if (!value) return false;
    return !!JSON.parse(value);
  }
}
