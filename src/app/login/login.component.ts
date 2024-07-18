import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isSpining: boolean = false;
  loginform!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }
  login(): void {
    if (this.loginform.invalid) {
      return;
    }

    this.isSpining = true;
    const { email, password } = this.loginform.value;

    this.auth.login({ email, password }).subscribe({
      next: (res) => {
        this.isSpining = false;
        if (res.token) {
          localStorage.setItem('jwtToken', res.token);
        } else {
          console.error('Login failed: No token received');
        }
      },
      error: (err) => {
        this.isSpining = false;
        console.error('Login error', err);
      }
    });
  }



}
