import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgbDatepicker, NgbDatepickerModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardComponent, CustomAdapter, CustomDateParserFormatter } from './board.component';
import { DwhService } from './../../services/dwh/dwh.service';
import { Kpi } from './../../models/kpi/kpi.model';
import { of } from 'rxjs';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
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
      declarations: [BoardComponent],
      providers: [
        DwhService,
        { provide: NgbDateAdapter, useClass: CustomAdapter },
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    dwhService = TestBed.inject(DwhService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct date and call getKpi', () => {
    spyOn(component, 'getKpi');
    component.ngOnInit();
    expect(component.date).toBe(getDate());
    expect(component.getKpi).toHaveBeenCalled();
  });

  it('should call getAll on DwhService with correct URL on getKpi', () => {
    const mockResponse: Kpi[] = [];
    spyOn(dwhService, 'getAll').and.returnValue(of(mockResponse));
    component.date = '21-05-2024';
    component.getKpi();
    expect(dwhService.getAll).toHaveBeenCalledWith('2024-05-21');
    expect(component.kpis).toBe(mockResponse);
  });

  it('should call getAllDwh on DwhService with correct URL on getKpiDwh', () => {
    const mockResponse: Kpi[] = [];
    spyOn(dwhService, 'getAllDwh').and.returnValue(of(mockResponse));
    component.date = '21-05-2024';
    component.getKpiDwh();
    expect(dwhService.getAllDwh).toHaveBeenCalledWith('2024-05-21');
    expect(component.kpis).toBe(mockResponse);
  });

  it('should calculate total parc correctly', () => {
    component.kpis = [
      { parc: 10 } as Kpi,
      { parc: 20 } as Kpi,
      { parc: 30 } as Kpi,
    ];
    expect(component.getTotalParc()).toBe(60);
  });

  it('should calculate total activation correctly', () => {
    component.kpis = [
      { activation: 5 } as Kpi,
      { activation: 15 } as Kpi,
      { activation: 25 } as Kpi,
    ];
    expect(component.getTotalActivation()).toBe(45);
  });

  it('should call sendSms on DwhService with correct URL on sendSms', () => {
    spyOn(dwhService, 'sendSms').and.returnValue(of({}));
    component.date = '21-05-2024';
    component.sendSms();
    expect(dwhService.sendSms).toHaveBeenCalledWith('2024-05-21');
  });

  it('should format number with spaces correctly', () => {
    expect(component.floatNumberWithSpaces(1234567)).toBe('1 234 567');
    expect(component.floatNumberWithSpaces(1234.567)).toBe('1 234.567');
  });
});

function getDate(): string {
  const now = new Date();
  const day = now.getDate() - 1;
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return `${day}-${month}-${year}`;
}
