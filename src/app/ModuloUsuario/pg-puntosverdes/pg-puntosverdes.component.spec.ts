import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPuntosverdesComponent } from './pg-puntosverdes.component';

describe('PgPuntosverdesComponent', () => {
  let component: PgPuntosverdesComponent;
  let fixture: ComponentFixture<PgPuntosverdesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPuntosverdesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPuntosverdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
