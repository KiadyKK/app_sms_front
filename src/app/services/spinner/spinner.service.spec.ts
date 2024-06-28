import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService],
    });
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with numberOfRequests as 0 and showSpinner as false', () => {
    expect(service.numberOfRequests).toBe(0);
    service.showSpinner.subscribe(value => {
      expect(value).toBeFalse();
    });
  });

  it('should increment numberOfRequests and set showSpinner to true on "plus" state', () => {
    service.handleRequest('plus');
    expect(service.numberOfRequests).toBe(1);
    service.showSpinner.subscribe(value => {
      expect(value).toBeTrue();
    });
  });

  it('should decrement numberOfRequests and set showSpinner to false on "minus" state when numberOfRequests is 1', () => {
    service.numberOfRequests = 1; 
    service.handleRequest('minus');
    expect(service.numberOfRequests).toBe(0);
    service.showSpinner.subscribe(value => {
      expect(value).toBeFalse();
    });
  });

  it('should not set numberOfRequests to negative values', () => {
    service.handleRequest('minus');
    expect(service.numberOfRequests).toBe(-1);
    service.handleRequest('minus');
    expect(service.numberOfRequests).toBe(-2);
    service.showSpinner.subscribe(value => {
      expect(value).toBeFalse();
    });
  });

  it('should maintain correct showSpinner state with multiple requests', () => {
    const showSpinnerSpy = spyOn(service.showSpinner, 'next').and.callThrough();

    service.handleRequest('plus');
    service.handleRequest('plus');
    expect(service.numberOfRequests).toBe(2);
    expect(showSpinnerSpy).toHaveBeenCalledWith(true);

    service.handleRequest('minus');
    expect(service.numberOfRequests).toBe(1);
    expect(showSpinnerSpy).toHaveBeenCalledWith(true);

    service.handleRequest('minus');
    expect(service.numberOfRequests).toBe(0);
    service.showSpinner.subscribe(value => {
      expect(value).toBeFalse();
    });
  });
});
