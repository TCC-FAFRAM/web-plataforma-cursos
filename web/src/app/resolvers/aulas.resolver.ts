import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AulaService } from '../services/curso/aula.service';

@Injectable({ providedIn: 'root' })
export class AulasResolver {
  constructor(private aulaService: AulaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const idCurso = route.paramMap.get('idCurso');
    return this.aulaService.getAllByCurso(idCurso ?? 1);
  }
}
