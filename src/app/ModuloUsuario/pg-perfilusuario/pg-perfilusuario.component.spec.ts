import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPerfilusuarioComponent } from './pg-perfilusuario.component';

describe('PgPerfilusuarioComponent', () => {
  let component: PgPerfilusuarioComponent;
  let fixture: ComponentFixture<PgPerfilusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPerfilusuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPerfilusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
