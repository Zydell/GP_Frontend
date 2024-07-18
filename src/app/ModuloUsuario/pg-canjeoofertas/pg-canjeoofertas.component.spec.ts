import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgCanjeoofertasComponent } from './pg-canjeoofertas.component';

describe('PgCanjeoofertasComponent', () => {
  let component: PgCanjeoofertasComponent;
  let fixture: ComponentFixture<PgCanjeoofertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgCanjeoofertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgCanjeoofertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
