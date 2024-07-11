import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgHistorialciudadanoComponent } from './pg-historialciudadano.component';

describe('PgHistorialciudadanoComponent', () => {
  let component: PgHistorialciudadanoComponent;
  let fixture: ComponentFixture<PgHistorialciudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgHistorialciudadanoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgHistorialciudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
