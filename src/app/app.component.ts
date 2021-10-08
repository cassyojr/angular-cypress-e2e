import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'angular-cypress-e2e';

  constructor(private authService: AuthService) {}

  public signOut(): void {
    this.authService.signOut();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }
}
