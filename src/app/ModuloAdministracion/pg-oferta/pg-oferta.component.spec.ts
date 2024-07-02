import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgOfertaComponent } from './pg-oferta.component';

describe('PgOfertaComponent', () => {
  let component: PgOfertaComponent;
  let fixture: ComponentFixture<PgOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgOfertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
