import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPuntoscriticosComponent } from './pg-puntoscriticos.component';

describe('PgPuntoscriticosComponent', () => {
  let component: PgPuntoscriticosComponent;
  let fixture: ComponentFixture<PgPuntoscriticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPuntoscriticosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPuntoscriticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
