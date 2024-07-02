import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgRegisterComponent } from './pg-register.component';

describe('PgRegisterComponent', () => {
  let component: PgRegisterComponent;
  let fixture: ComponentFixture<PgRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
