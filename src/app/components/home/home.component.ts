import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user: any;
  public form = new FormGroup({
    origin: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.authService.getInfo('userId').subscribe((user) => {
        this.user = user;
        console.log('oninit', this.user);
      });
    }
  }

  get origin(): AbstractControl {
    return this.form.controls.origin;
  }

  get destination(): AbstractControl {
    return this.form.controls.destination;
  }
}
