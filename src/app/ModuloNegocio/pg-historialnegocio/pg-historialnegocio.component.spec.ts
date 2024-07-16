import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgHistorialnegocioComponent } from './pg-historialnegocio.component';

describe('PgHistorialnegocioComponent', () => {
  let component: PgHistorialnegocioComponent;
  let fixture: ComponentFixture<PgHistorialnegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgHistorialnegocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgHistorialnegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
