import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterSubmenu } from '../../../../dtos/submenu/submenu.dto';


@Component({
  selector: 'app-submenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './submenu.component.html',
})
export class SubmenuComponent {
  @Input() items: RouterSubmenu[] = [];
  
}
