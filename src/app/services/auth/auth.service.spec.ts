import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/models/login/login.model';
import { environment } from 'src/environments/environment.development';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should send a POST request to login endpoint', () => {
    const mockLoginData: Login = { tri: 'testuser', mdp: 'testpass' };
    const mockResponse = { success: true, token: '12345' };

    service.login(mockLoginData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.apiUrl + 'user/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('skip')).toBe('true');
    expect(req.request.body).toEqual(mockLoginData);

    req.flush(mockResponse); // Simule une réponse HTTP
    
  });
});
