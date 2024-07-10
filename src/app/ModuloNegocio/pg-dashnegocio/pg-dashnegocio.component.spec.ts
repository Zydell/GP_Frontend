import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgDashnegocioComponent } from './pg-dashnegocio.component';

describe('PgDashnegocioComponent', () => {
  let component: PgDashnegocioComponent;
  let fixture: ComponentFixture<PgDashnegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgDashnegocioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgDashnegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
