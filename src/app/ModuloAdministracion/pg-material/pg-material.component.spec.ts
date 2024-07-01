import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgMaterialComponent } from './pg-material.component';

describe('PgMaterialComponent', () => {
  let component: PgMaterialComponent;
  let fixture: ComponentFixture<PgMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
