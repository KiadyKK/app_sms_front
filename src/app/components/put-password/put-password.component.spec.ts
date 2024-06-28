import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { PutPasswordComponent } from './put-password.component';
import { PutPasswordService } from '../../services/putPassword/put-password.service';
import { StorageService } from '../../services/storage/storage.service';

describe('PutPasswordComponent', () => {
  let component: PutPasswordComponent;
  let fixture: ComponentFixture<PutPasswordComponent>;
  let putPasswordService: jasmine.SpyObj<PutPasswordService>;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    const putPasswordServiceSpy = jasmine.createSpyObj('PutPasswordService', ['putPassword']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getItem']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PutPasswordComponent],
      providers: [
        { provide: PutPasswordService, useValue: putPasswordServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PutPasswordComponent);
    component = fixture.componentInstance;
    putPasswordService = TestBed.inject(PutPasswordService) as jasmine.SpyObj<PutPasswordService>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    storageService.getItem.and.returnValue('TRI'); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize trigramme on ngOnInit', () => {
    component.ngOnInit();
    expect(component.trigramme).toBe('TRI');
  });

  it('should validate password and confirmation match', () => {
    component.putPassword.setValue({ password: 'password123', newPassword: 'newPassword123', confirmation: 'newPassword123' });
    expect(component.verifyPassword()).toBeTrue();

    component.putPassword.setValue({ password: 'password123', newPassword: 'newPassword123', confirmation: 'wrongConfirmation' });
    expect(component.verifyPassword()).toBeFalse();
  });

  it('should call PutPasswordService and show success message on valid form submission', () => {
    putPasswordService.putPassword.and.returnValue(of({ success: true }));
    spyOn(component, 'showSuccessMessage');

    component.putPassword.setValue({ password: 'password123', newPassword: 'newPassword123', confirmation: 'newPassword123' });
    component.trigramme = 'TRI';
    component.onSubmit();

    expect(putPasswordService.putPassword).toHaveBeenCalledWith({ trigramme: 'TRI', password: 'password123', newPassword: 'newPassword123' });
    expect(component.showSuccessMessage).toHaveBeenCalled();
  });

  it('should call PutPasswordService and show error message on service error', () => {
    putPasswordService.putPassword.and.returnValue(throwError({ error: 'Error' }));
    spyOn(component, 'showErrorMessage');

    component.putPassword.setValue({ password: 'password123', newPassword: 'newPassword123', confirmation: 'newPassword123' });
    component.trigramme = 'TRI';
    component.onSubmit();

    expect(putPasswordService.putPassword).toHaveBeenCalledWith({ trigramme: 'TRI', password: 'password123', newPassword: 'newPassword123' });
    expect(component.showErrorMessage).toHaveBeenCalled();
  });

  it('should not submit the form if it is invalid', () => {
    spyOn(component, 'showSuccessMessage');
    spyOn(component, 'showErrorMessage');

    component.putPassword.setValue({ password: '', newPassword: '', confirmation: '' });
    component.onSubmit();

    expect(putPasswordService.putPassword).not.toHaveBeenCalled();
    expect(component.showSuccessMessage).not.toHaveBeenCalled();
    expect(component.showErrorMessage).not.toHaveBeenCalled();
  });
});
