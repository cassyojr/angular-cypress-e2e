import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  convertToParamMap,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const email = 'admin@teste.com';
  const password = 'admin';
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'signin', component: <any>{} },
        ]),
      ],
      providers: [],
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('can activate should be false when user is not authenticated', () => {
    const authService = new AuthService(router);
    authService.signOut();
    var authGuard = new AuthGuard(authService, router);

    expect(authGuard.canActivate(<any>{}, <any>{})).toBe(false);
  });

  it('can activate should be true when user is not authenticated', () => {
    const authService = new AuthService(router);
    authService.authenticate(email, password);
    var authGuard = new AuthGuard(authService, router);

    expect(authGuard.canActivate(<any>{}, <any>{})).toBe(true);
  });
});
