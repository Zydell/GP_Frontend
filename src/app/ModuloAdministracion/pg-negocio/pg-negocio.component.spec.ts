import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgNegocioComponent } from './pg-negocio.component';

describe('PgNegocioComponent', () => {
  let component: PgNegocioComponent;
  let fixture: ComponentFixture<PgNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgNegocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
