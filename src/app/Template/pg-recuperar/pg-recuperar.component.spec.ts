import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgRecuperarComponent } from './pg-recuperar.component';

describe('PgRecuperarComponent', () => {
  let component: PgRecuperarComponent;
  let fixture: ComponentFixture<PgRecuperarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgRecuperarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgRecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
