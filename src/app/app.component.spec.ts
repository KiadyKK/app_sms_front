import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';  
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { StorageService } from './services/storage/storage.service';
import { BnNgIdleService } from 'bn-ng-idle';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storageService: jasmine.SpyObj<StorageService>;
  let bnIdleService: jasmine.SpyObj<BnNgIdleService>;

  beforeEach(async () => {
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getItem', 'clean']);
    const bnIdleServiceSpy = jasmine.createSpyObj('BnNgIdleService', ['startWatching']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: BnNgIdleService, useValue: bnIdleServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    bnIdleService = TestBed.inject(BnNgIdleService) as jasmine.SpyObj<BnNgIdleService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isLoggedIn and role from storageService on ngOnInit', () => {
    storageService.getItem.and.callFake((key: string) => {
      switch (key) {
        case 'authorization': return true;
        case 'role': return '1';
        default: return null;
      }
    });

    
    bnIdleService.startWatching.and.returnValue(of(false)); 

    component.ngOnInit();

    expect(component.isLoggedIn).toBeTrue();
    expect(component.role).toBe(1);
  });

  it('should initialize tri from storageService if logged in', () => {
    storageService.getItem.and.callFake((key: string) => {
      switch (key) {
        case 'authorization': return 'true';
        case 'role': return '1';
        case 'tri': return 'someTriValue';
        default: return null;
      }
    });

    bnIdleService.startWatching.and.returnValue(of(false)); 

    component.ngOnInit();

    expect(component.tri).toBe('someTriValue');
  });

  it('should start watching for idle timeout and logout if timed out', () => {
    const logoutSpy = spyOn(component, 'logout');
    const reloadPageSpy = spyOn(component, 'reloadPage');
    bnIdleService.startWatching.and.returnValue(of(true)); 

    component.ngOnInit();

    expect(bnIdleService.startWatching).toHaveBeenCalledWith(3600);
    expect(logoutSpy).toHaveBeenCalled();
    expect(reloadPageSpy).toHaveBeenCalled();
  });

  it('should call storageService.clean on logout', () => {
    component.logout();
    expect(storageService.clean).toHaveBeenCalled();
  });
});
