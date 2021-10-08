import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SignInComponent implements OnInit {
  public hasErrorOnSignIn = false;
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public authenticate(): void {
    if (this.form.invalid) return;

    const isAuthenticated = this.authService.authenticate(
      this.form.controls.email.value,
      this.form.controls.password.value
    );

    if (!isAuthenticated) {
      this.hasErrorOnSignIn = true;
    } else {
      this.router.navigate(['/home']);
    }
  }

  get email(): AbstractControl {
    return this.form.controls.email;
  }

  get password(): AbstractControl {
    return this.form.controls.password;
  }
}
