import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DwhService } from './dwh.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

describe('DwhService', () => {
  let service: DwhService;
  let httpMock: HttpTestingController;
  const apiURL = environment.apiUrl + 'kpi';
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DwhService]
    });

    service = TestBed.inject(DwhService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAll with correct URL', () => {
    const testDate = '2024-05-22';
    service.getAll(testDate).subscribe();

    const req = httpMock.expectOne(`${apiURL}?date=${testDate}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({}); // Simule une réponse vide
  });

  it('should call getAllDwh with correct URL', () => {
    const testDate = '2024-05-22';
    service.getAllDwh(testDate).subscribe();

    const req = httpMock.expectOne(`${apiURL}/dwh?date=${testDate}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({}); // Simule une réponse vide
  });

  it('should call sendSms with correct URL', () => {
    const testDate = '2024-05-22';
    service.sendSms(testDate).subscribe();

    const req = httpMock.expectOne(`${apiURL}/send?date=${testDate}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({}); // Simule une réponse vide
  });

  it('should call getAllZone with correct URL', () => {
    service.getAllZone().subscribe();

    const req = httpMock.expectOne(`${apiURL}/zone`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({}); // Simule une réponse vide
  });

  it('should call getHistoric with correct URL', () => {
    const testDate = '2024-05-22';
    service.getHistoric(testDate).subscribe();

    const req = httpMock.expectOne(`${apiURL}/historic?date=${testDate}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({}); // Simule une réponse vide
  });
});
