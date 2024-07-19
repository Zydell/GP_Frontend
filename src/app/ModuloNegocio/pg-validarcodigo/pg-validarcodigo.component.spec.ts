import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgValidarcodigoComponent } from './pg-validarcodigo.component';

describe('PgValidarcodigoComponent', () => {
  let component: PgValidarcodigoComponent;
  let fixture: ComponentFixture<PgValidarcodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgValidarcodigoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgValidarcodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
