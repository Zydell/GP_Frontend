import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgVerofertasComponent } from './pg-verofertas.component';

describe('PgVerofertasComponent', () => {
  let component: PgVerofertasComponent;
  let fixture: ComponentFixture<PgVerofertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgVerofertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgVerofertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
