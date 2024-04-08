import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutPasswordComponent } from './put-password.component';

describe('PutPasswordComponent', () => {
  let component: PutPasswordComponent;
  let fixture: ComponentFixture<PutPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PutPasswordComponent]
    });
    fixture = TestBed.createComponent(PutPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
