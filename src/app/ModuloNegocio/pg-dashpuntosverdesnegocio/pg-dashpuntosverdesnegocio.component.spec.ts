import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgDashpuntosverdesnegocioComponent } from './pg-dashpuntosverdesnegocio.component';

describe('PgDashpuntosverdesnegocioComponent', () => {
  let component: PgDashpuntosverdesnegocioComponent;
  let fixture: ComponentFixture<PgDashpuntosverdesnegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgDashpuntosverdesnegocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgDashpuntosverdesnegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
