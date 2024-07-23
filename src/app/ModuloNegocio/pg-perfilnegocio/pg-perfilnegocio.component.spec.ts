import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPerfilnegocioComponent } from './pg-perfilnegocio.component';

describe('PgPerfilnegocioComponent', () => {
  let component: PgPerfilnegocioComponent;
  let fixture: ComponentFixture<PgPerfilnegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgPerfilnegocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgPerfilnegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
