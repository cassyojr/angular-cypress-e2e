import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  const email = 'admin@teste.com';
  const password = 'admin';
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('authenticate should return false when email is empty', () => {
    const result = service.authenticate('', password);

    expect(result).toBe(false);
  });

  it('authenticate should return false when password is empty', () => {
    const result = service.authenticate(email, '');

    expect(result).toBe(false);
  });

  it('authenticate should return true when email and password are valid', () => {
    const result = service.authenticate(email, password);

    expect(result).toBe(true);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
