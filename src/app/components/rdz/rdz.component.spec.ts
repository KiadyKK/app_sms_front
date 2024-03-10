import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdzComponent } from './rdz.component';

describe('RdzComponent', () => {
  let component: RdzComponent;
  let fixture: ComponentFixture<RdzComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdzComponent]
    });
    fixture = TestBed.createComponent(RdzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
