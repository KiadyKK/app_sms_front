import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserComponent } from './user.component';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['addUser', 'getAll', 'remove']);

    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: UserService, useValue: userServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    userService.getAll.and.returnValue(of([]));
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.controls['nom']).toBeDefined();
    expect(component.form.controls['prenom']).toBeDefined();
    expect(component.form.controls['email']).toBeDefined();
    expect(component.form.controls['tel']).toBeDefined();
    expect(component.form.controls['tri']).toBeDefined();
  });

  it('should call getAll on init', () => {
    spyOn(component, 'getAll');
    component.ngOnInit();
    expect(component.getAll).toHaveBeenCalled();
  });

  it('should add a user', () => {
    const user = { nom: 'Test', prenom: 'User', email: 'test@example.com', tel: '0323203232', tri: 'ABC' };
    component.form.setValue(user);
    userService.addUser.and.returnValue(of(user));

    component.onSubmit();
    expect(userService.addUser).toHaveBeenCalledWith(user);
  });

  it('should reset form after adding user', () => {
    const user = { nom: 'Test', prenom: 'User', email: 'test@example.com', tel: '0323203232', tri: 'ABC' };
    component.form.setValue(user);
    userService.addUser.and.returnValue(of(user));

    component.onSubmit();
    expect(component.form.controls['nom'].value).toBe('');
    expect(component.addMode).toBe(false);
  });

  it('should call getAll when a user is removed', () => {
    const userId = 1;
    spyOn(window, 'confirm').and.returnValue(true);
    userService.remove.and.returnValue(of({}));

    component.remove(userId);
    expect(userService.remove).toHaveBeenCalledWith(userId);
    expect(userService.getAll).toHaveBeenCalled();
  });
});
