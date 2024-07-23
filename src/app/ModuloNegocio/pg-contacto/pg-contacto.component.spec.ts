import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgContactoComponent } from './pg-contacto.component';

describe('PgContactoComponent', () => {
  let component: PgContactoComponent;
  let fixture: ComponentFixture<PgContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgContactoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
