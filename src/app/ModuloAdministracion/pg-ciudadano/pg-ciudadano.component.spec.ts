import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgCiudadanoComponent } from './pg-ciudadano.component';

describe('PgCiudadanoComponent', () => {
  let component: PgCiudadanoComponent;
  let fixture: ComponentFixture<PgCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgCiudadanoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
