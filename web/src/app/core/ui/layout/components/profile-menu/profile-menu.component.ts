import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../components/icone/icone.component';
import { TokenService } from '../../../../../services/autenticacao/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './profile-menu.component.html',
})
export class ProfileMenuComponent {
  showMenu = false;
  tokenService = inject(TokenService);
  router = inject(Router);
  

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  getEmail(): string{
    return this.tokenService.decodificarPayload()?.email ?? '';
  }

  getNome(): string{
    return this.tokenService.decodificarPayload()?.nome ?? '';
  }

  logout() {
    this.showMenu = false;
    this.tokenService.limpar();
    this.router.navigate(['/login'])  
  }


}
