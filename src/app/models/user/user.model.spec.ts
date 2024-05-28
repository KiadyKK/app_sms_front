import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment.development';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes HTTP en attente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to add a new user', () => {
    const mockUserData = { username: 'newuser', email: 'newuser@example.com' };
    const mockResponse = { success: true, userId: 1 };

    service.addUser(mockUserData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}user/new`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockUserData);

    req.flush(mockResponse); // Simule une réponse HTTP
  });

  it('should send a GET request to retrieve all users by name', () => {
    const nom = 'john';
    const mockResponse = [{ id: 1, username: 'john', email: 'john@example.com' }];

    service.getAll(nom).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}user?nom=${nom}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse); // Simule une réponse HTTP
  });

  it('should send a DELETE request to remove a user by id', () => {
    const userId = 1;
    const mockResponse = { success: true };

    service.remove(userId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}user/${userId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse); // Simule une réponse HTTP
  });
});
