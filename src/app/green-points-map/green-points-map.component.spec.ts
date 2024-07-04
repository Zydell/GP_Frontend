import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenPointsMapComponent } from './green-points-map.component';

describe('GreenPointsMapComponent', () => {
  let component: GreenPointsMapComponent;
  let fixture: ComponentFixture<GreenPointsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenPointsMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenPointsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
