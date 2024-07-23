import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgFaqComponent } from './pg-faq.component';

describe('PgFaqComponent', () => {
  let component: PgFaqComponent;
  let fixture: ComponentFixture<PgFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgFaqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
