import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPerfilAdminComponent } from './pg-perfil-admin.component';

describe('PgPerfilAdminComponent', () => {
  let component: PgPerfilAdminComponent;
  let fixture: ComponentFixture<PgPerfilAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPerfilAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPerfilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
