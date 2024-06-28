import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RdzComponent } from './rdz.component';
import { DwhService } from './../../services/dwh/dwh.service';
import { RdzService } from 'src/app/services/rdz/rdz.service';
import { Rdz } from 'src/app/models/rdz/rdz.model';
import { Zone } from 'src/app/models/zone/zone.model';

describe('RdzComponent', () => {
  let component: RdzComponent;
  let fixture: ComponentFixture<RdzComponent>;
  let dwhService: jasmine.SpyObj<DwhService>;
  let rdzService: jasmine.SpyObj<RdzService>;

  beforeEach(async () => {
    const dwhServiceSpy = jasmine.createSpyObj('DwhService', ['getAllZone']);
    const rdzServiceSpy = jasmine.createSpyObj('RdzService', ['getAll', 'addRdz', 'remove']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [RdzComponent],
      providers: [
        { provide: DwhService, useValue: dwhServiceSpy },
        { provide: RdzService, useValue: rdzServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdzComponent);
    component = fixture.componentInstance;
    dwhService = TestBed.inject(DwhService) as jasmine.SpyObj<DwhService>;
    rdzService = TestBed.inject(RdzService) as jasmine.SpyObj<RdzService>;

    dwhService.getAllZone.and.returnValue(of([]));
    rdzService.getAll.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize zones and rdzs on ngOnInit', () => {
    const zonesData: Zone[] = [{ id: 1, name: 'Zone 1' }];
    const rdzsData: Rdz[] = [{
      id: 1,
      idZone: 1,
      zone: 'Zone 1',
      nom: 'Nom 1',
      prenom: 'Prenom 1',
      email: 'email1@example.com',
      tel: '0323203232',
      tri: 'ABC'
    }];

    dwhService.getAllZone.and.returnValue(of(zonesData));
    rdzService.getAll.and.returnValue(of(rdzsData));

    component.ngOnInit();

    expect(component.zones).toEqual(zonesData);
    expect(component.rdzs).toEqual(rdzsData);
  });

  it('should add a new row on addRow call', () => {
    component.addRow();
    expect(component.addMode).toBeTrue();
  });

  it('should reset form and call getRdz on successful submit', () => {
    const formValue = {
      zone: { id: 1, name: 'Zone 1' },
      idZone: '1',
      nom: 'Nom',
      prenom: 'Prenom',
      email: 'email@example.com',
      tel: '0323203232',
      tri: 'TRI'
    };

    rdzService.addRdz.and.returnValue(of({}));
    spyOn(component, 'getRdz');

    component.form.setValue(formValue);
    component.onSubmit();

    expect(rdzService.addRdz).toHaveBeenCalledWith({
      zone: 'Zone 1',
      idZone: 1,  // This should match the type being passed in the component code
      nom: 'Nom',
      prenom: 'Prenom',
      email: 'email@example.com',
      tel: '0323203232',
      tri: 'TRI'
    });
    expect(component.getRdz).toHaveBeenCalled();
    expect(component.addMode).toBeFalse();
    expect(component.form.valid).toBeFalse();
  });

  // it('should handle errors on submit', () => {
  //   const formValue = {
  //     zone: { id: 1, name: 'Zone 1' },
  //     idZone: '1',
  //     nom: 'Nom',
  //     prenom: 'Prenom',
  //     email: 'email@example.com',
  //     tel: '0323203232',
  //     tri: 'TRI'
  //   };

  //   rdzService.addRdz.and.returnValue(throwError({ error: 'Error' }));

  //   component.form.setValue(formValue);
  //   component.onSubmit();

  //   expect(rdzService.addRdz).toHaveBeenCalledWith({
  //     zone: 'Zone 1',
  //     idZone: formValue.zone.id, 
  //     nom: 'Nom',
  //     prenom: 'Prenom',
  //     email: 'email@example.com',
  //     tel: '0323203232',
  //     tri: 'TRI'
  //   });
  //
  //   expect(component.form.value).toEqual(formValue);
  // });

  it('should call remove on rdzService when remove is called', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    rdzService.remove.and.returnValue(of({}));
    spyOn(component, 'getRdz');

    component.remove(1);

    expect(rdzService.remove).toHaveBeenCalledWith(1);
    expect(component.getRdz).toHaveBeenCalled();
  });

  it('should not call remove on rdzService if confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    rdzService.remove.and.returnValue(of({}));
    spyOn(component, 'getRdz');

    component.remove(1);

    expect(rdzService.remove).not.toHaveBeenCalled();
    expect(component.getRdz).not.toHaveBeenCalled();
  });
});
