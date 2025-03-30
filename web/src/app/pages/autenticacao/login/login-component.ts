import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AutenticacaoService } from '../../../services/autenticacao/autenticacao.service';
import { TokenService } from '../../../services/autenticacao/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule 

  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  autenticateService = inject(AutenticacaoService);
  tokenService = inject(TokenService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }); 
  }

  get email() {
    return this.loginForm.get('email');
  }
  
  get password() {
    return this.loginForm.get('password');
  }
  

  onSubmit(): void {

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.autenticateService.autenticacao({email: email, senha:password}).subscribe({
        next: result => {
          this.tokenService.salvarToken(result.token);
          this.router.navigate(['/inicio']);
        },
        error: e => {}
      })
    }
  }
}
