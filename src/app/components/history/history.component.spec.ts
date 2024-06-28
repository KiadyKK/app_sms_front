import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgbDatepicker, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history.component';
import { DwhService } from 'src/app/services/dwh/dwh.service';
import { of } from 'rxjs';
import { Hitoric } from 'src/app/models/historic/hitoric.model';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let dwhService: DwhService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbDatepicker,
        NgbDatepickerModule,
        FormsModule,
        ReactiveFormsModule],
      declarations: [HistoryComponent],
      providers: [DwhService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    dwhService = TestBed.inject(DwhService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct date and call getHistoric', () => {
    spyOn(component, 'getHistoric').and.callThrough();
    component.ngOnInit();
    expect(component.date).toBe(getDate());
    expect(component.getHistoric).toHaveBeenCalled();
  });

  it('should call getHistoric on DwhService with the correct URL on getHistoric', () => {
    const mockResponse: Hitoric[] = [];
    spyOn(dwhService, 'getHistoric').and.returnValue(of(mockResponse));
    component.date = '21-05-2024';
    component.getHistoric();
    expect(dwhService.getHistoric).toHaveBeenCalledWith('2024-05-21');
    expect(component.historics).toBe(mockResponse);
  });
});

function getDate(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
}
