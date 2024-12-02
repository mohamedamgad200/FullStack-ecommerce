import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email]],
    password: ['', [Validators.minLength(5)]],
  });
  register() {
    let value = this.registerForm.value;
    this.authService
      .register(value.name!, value.email!, value.password!)
      .subscribe(
        (reult) => {
          console.log(reult);
          alert('user registered successfuly');
          this.router.navigateByUrl('/login');
        },
        (error) => {
          alert('Failed to registered user');
          console.error(error);
        }
      );
  }
}
