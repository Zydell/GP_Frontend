import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPuntoverdeComponent } from './pg-puntoverde.component';

describe('PgPuntoverdeComponent', () => {
  let component: PgPuntoverdeComponent;
  let fixture: ComponentFixture<PgPuntoverdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPuntoverdeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPuntoverdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
