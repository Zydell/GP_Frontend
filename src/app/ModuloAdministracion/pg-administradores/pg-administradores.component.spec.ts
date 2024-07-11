import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgAdministradoresComponent } from './pg-administradores.component';

describe('PgAdministradoresComponent', () => {
  let component: PgAdministradoresComponent;
  let fixture: ComponentFixture<PgAdministradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgAdministradoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
