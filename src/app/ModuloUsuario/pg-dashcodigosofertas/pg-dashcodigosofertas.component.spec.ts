import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgDashcodigosofertasComponent } from './pg-dashcodigosofertas.component';

describe('PgDashcodigosofertasComponent', () => {
  let component: PgDashcodigosofertasComponent;
  let fixture: ComponentFixture<PgDashcodigosofertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgDashcodigosofertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgDashcodigosofertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
