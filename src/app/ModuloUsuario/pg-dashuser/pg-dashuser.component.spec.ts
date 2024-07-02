import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgDashuserComponent } from './pg-dashuser.component';

describe('PgDashuserComponent', () => {
  let component: PgDashuserComponent;
  let fixture: ComponentFixture<PgDashuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgDashuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgDashuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
