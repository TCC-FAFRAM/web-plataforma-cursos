import { NestedTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenService } from './services/autenticacao/token.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  autenticado: boolean = true;
  tokenService = inject(TokenService)
 
  ngOnInit() {
    this.tokenService
      .getAutenticacaoValida$()
      .subscribe((autenticado: boolean) => {
        this.autenticado = autenticado;
      });
  }
}
