import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { IconComponent } from "../components/icone/icone.component";
import { LayoutService } from './layout.component.service';
import { ProfileMenuComponent } from "./components/profile-menu/profile-menu.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, IconComponent, ProfileMenuComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  layoutService = inject(LayoutService); 
  menuSelecionado = signal('Inicio');
  router = inject(Router);
   
    get getActiveSearch(): WritableSignal<boolean> {
          return this.layoutService.getActiveSearch
      }
    
    setActiveSearch(value: boolean) {
          this.layoutService.setActiveSearchSignal(value)
      }

    setMenuTexto(value: string){
      this.menuSelecionado.set(value);
      this._navigateRoute(value);
    }

    _navigateRoute(value: string){
      this.router.navigate([value.toLowerCase().replace(/\s+/g, '').replace(/de/g, '')]);
    }
}
