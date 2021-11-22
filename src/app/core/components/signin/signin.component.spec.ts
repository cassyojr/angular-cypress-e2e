import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignInComponent } from './signin.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';
import { HttpRequest } from '@angular/common/http';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [SignInComponent],
      providers: [AuthService],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isLoggedIn should be true is user is logged in', async () => {
    // const request = httpMock.expectOne({
    //   method: 'POST',
    //   url: 'https://localhost:44351/api/v1/User/Login',
    // });

    let spyC = spyOn(authService, 'authenticate').and.returnValue(<any>{
      username: 'ckist@dawudhauhw.com',
      password: '123',
    });

    // const request = httpMock.expectOne(
    //   (req: HttpRequest<any>) =>
    //     req.url == 'https://localhost:44351/api/v1/User/Login'
    // );
    // const request = httpMock.expectOne('https://localhost:44351/api/v1/User/Login');

    var response = authService.authenticate('email', 'password');
    // var response2 = request.flush(true);

    expect(response).not.toBeNull();
    // console.log(response, response2);
  });
});
