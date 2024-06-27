import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of, Subject } from 'rxjs';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerService: jasmine.SpyObj<SpinnerService>;
  let showSpinnerSubject: Subject<boolean>;

  beforeEach(async () => {
    // Create a spy object for SpinnerService
    showSpinnerSubject = new Subject<boolean>();
    const spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', [], {
      showSpinner: showSpinnerSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      imports: [MatProgressSpinnerModule], // Import MatProgressSpinnerModule here
      providers: [
        { provide: SpinnerService, useValue: spinnerServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(SpinnerService) as jasmine.SpyObj<SpinnerService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update spinnerActive to true when showSpinner emits true', () => {
    showSpinnerSubject.next(true);
    expect(component.spinnerActive).toBeTrue();
  });

  it('should update spinnerActive to false when showSpinner emits false', () => {
    showSpinnerSubject.next(false);
    expect(component.spinnerActive).toBeFalse();
  });
});
