import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RdzService } from './rdz.service';
import { environment } from 'src/environments/environment.development';

describe('RdzService', () => {
  let service: RdzService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RdzService],
    });

    service = TestBed.inject(RdzService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes HTTP en attente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to add a new rdz', () => {
    const mockRdzData = { title: 'New RDZ', description: 'RDZ description' };
    const mockResponse = { success: true, id: 1 };

    service.addRdz(mockRdzData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}rdz`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockRdzData);

    req.flush(mockResponse); // Simule une réponse HTTP
  });

  it('should send a GET request to retrieve all rdzs by name', () => {
    const nom = 'example';
    const mockResponse = [{ id: 1, title: 'Example RDZ', description: 'RDZ description' }];

    service.getAll(nom).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}rdz?nom=${nom}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse); // Simule une réponse HTTP
  });

  it('should send a DELETE request to remove a rdz by id', () => {
    const rdzId = 1;
    const mockResponse = { success: true };

    service.remove(rdzId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}rdz/${rdzId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse); // Simule une réponse HTTP
  });
});
