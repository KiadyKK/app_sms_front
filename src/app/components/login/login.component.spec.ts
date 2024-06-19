import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let storageService: jasmine.SpyObj<StorageService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getItem', 'saveUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home if already logged in', () => {
    storageService.getItem.and.returnValue('mockToken');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should not redirect to home if not logged in', () => {
    storageService.getItem.and.returnValue(null);
    component.ngOnInit();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should set errorMessage and isLoginFailed to true on login error', () => {
    const errorResponse = { error: 'Invalid credentials' };
    authService.login.and.returnValue(throwError(errorResponse));

    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith(component.form);
    expect(component.isLoginFailed).toBeTrue();
    expect(component.errorMessage).toBe('Invalid credentials');
  });

  it('should save user and reload on successful login', fakeAsync(() => {
    const response = { token: 'mockToken', user: {} };
    authService.login.and.returnValue(of(response));

    spyOn(component, 'reloadPage');

    component.onSubmit();
    tick(); // Simule l'écoulement du temps pour compléter les appels asynchrones

    expect(authService.login).toHaveBeenCalledWith(component.form);
    expect(storageService.saveUser).toHaveBeenCalledWith(response);
    expect(component.reloadPage).toHaveBeenCalled();
  }));

  it('should set errorMessage and isLoginFailed to true if no token in response', () => {
    const response = { user: {} };
    authService.login.and.returnValue(of(response));

    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith(component.form);
    expect(component.isLoginFailed).toBeTrue();
    expect(component.errorMessage).toBe('Error');
  });
});
