import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgGestionofertasComponent } from './pg-gestionofertas.component';

describe('PgGestionofertasComponent', () => {
  let component: PgGestionofertasComponent;
  let fixture: ComponentFixture<PgGestionofertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgGestionofertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgGestionofertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
