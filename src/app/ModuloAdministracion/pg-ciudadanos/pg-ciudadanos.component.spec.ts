import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgCiudadanosComponent } from './pg-ciudadanos.component';

describe('PgCiudadanosComponent', () => {
  let component: PgCiudadanosComponent;
  let fixture: ComponentFixture<PgCiudadanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgCiudadanosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgCiudadanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
