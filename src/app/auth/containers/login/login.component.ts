import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  showSpinner = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [{ value: '', disabled: false }],
      password: [{ value: '', disabled: false }],
    });

    this.authService.getLoginErrorListener().subscribe({
      next: (res) => {
        this.showSpinner = false;
        this.errorMessage = res?.error?.message;
      },
    });
  }

  async login() {
    this.showSpinner = true;
    this.showSpinner = false;
    this.authService.loginAPI(this.form.value);
  }

  cancel() {
    //
  }
}
