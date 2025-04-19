import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleModulosComponent } from './controle.modulos.component';

describe('ControleModulosComponent', () => {
  let component: ControleModulosComponent;
  let fixture: ComponentFixture<ControleModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleModulosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControleModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
