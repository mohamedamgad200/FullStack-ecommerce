import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private foemBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  loginForm = this.foemBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  login() {
    let value = this.loginForm.value;
    this.authService.login(value.email!, value.password!).subscribe(
      (result: any) => {
        console.log(result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
