import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgRegistroreciclajeComponent } from './pg-registroreciclaje.component';

describe('PgRegistroreciclajeComponent', () => {
  let component: PgRegistroreciclajeComponent;
  let fixture: ComponentFixture<PgRegistroreciclajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgRegistroreciclajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgRegistroreciclajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
