import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const email = 'admin@teste.com';
  const password = 'admin';
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('authenticate should return false when email is empty', async () => {
    const result = await service.authenticate('', password);

    expect(result).toBe(false);
  });

  it('authenticate should return false when password is empty', async () => {
    const result = await service.authenticate(email, '');

    expect(result).toBe(false);
  });

  it('authenticate should return true when email and password are valid', fakeAsync(() => {
    const result = service.authenticate(email, password).then((res) => {
      expect(res).toBe(true);
    });

    // wait until all Promises are resolved
    tick();

    const request = httpMock
      .expectOne({
        method: 'POST',
        url: 'https://localhost:44351/api/v1/User/Login',
      })
      .flush(<any>{
        username: 'dawdahwuwahuwadaw',
        password: 'dawdawwwad',
      });

    httpMock.verify();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getInfo should return null when userId is null', fakeAsync(() => {
    service.getInfo().subscribe((res) => expect(res).toBeNull());
  }));

  it('getInfo should return user information when userId is not null', fakeAsync(() => {
    service.getInfo('123').subscribe((res) => {
      expect(res).not.toBeNull();
      expect(res.name).toBe('Cassyo Junior');
      expect(res.email).toBe('ckist@launchcg.com');
    });

    // wait until all Promises are resolved
    tick();

    var request = httpMock.expectOne(
      (x) => x.url === 'https://localhost:44351/api/v1/User?userId=123'
    );

    request.flush(<any>{ name: 'Cassyo Junior', email: 'ckist@launchcg.com' });

    expect(request.request.method === 'GET');

    httpMock.verify();
  }));
});
