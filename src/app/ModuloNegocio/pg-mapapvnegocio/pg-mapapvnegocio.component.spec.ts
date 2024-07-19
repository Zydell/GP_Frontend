import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgMapapvnegocioComponent } from './pg-mapapvnegocio.component';

describe('PgMapapvnegocioComponent', () => {
  let component: PgMapapvnegocioComponent;
  let fixture: ComponentFixture<PgMapapvnegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgMapapvnegocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgMapapvnegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
