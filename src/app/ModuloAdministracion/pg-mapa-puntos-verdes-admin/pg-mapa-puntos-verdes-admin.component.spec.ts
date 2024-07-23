import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgMapaPuntosVerdesAdminComponent } from './pg-mapa-puntos-verdes-admin.component';

describe('PgMapaPuntosVerdesAdminComponent', () => {
  let component: PgMapaPuntosVerdesAdminComponent;
  let fixture: ComponentFixture<PgMapaPuntosVerdesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgMapaPuntosVerdesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgMapaPuntosVerdesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
