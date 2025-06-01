import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AutenticacaoService } from '../../../services/autenticacao/autenticacao.service';
import { TokenService } from '../../../services/autenticacao/token.service';
import { Router } from '@angular/router';
import { CadastroUsuarioComponent } from "../cadastro.usuario/cadastro.usuario.component";
import { ModalFeedbackComponent } from "../../../core/ui/components/modal/modal";


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CadastroUsuarioComponent,
    ModalFeedbackComponent
],
})
export class LoginComponent {
    showModal = false;
modalType: 'success' | 'error' = 'success';
modalTitle = '';
modalMsg = '';
  loginForm: FormGroup;
  autenticateService = inject(AutenticacaoService);
  tokenService = inject(TokenService);
  router = inject(Router);
  active = false;

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
  
    onCloseModal() {
  this.showModal = false;
}

  onSubmit(): void {

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.autenticateService.autenticacao({email: email, senha:password}).subscribe({
        next: result => {
          this.tokenService.salvarToken(result.token);
          this.router.navigate(['/inicio']);
        },
        error: (err) => {
            this.modalType = 'error';
        this.modalTitle = 'Alerta';
        this.modalMsg = err.error?.error || err.message || 'Ocorreu um erro ao criar sua conta.';
        this.showModal = true;
        }
      })
    }
  }
}
