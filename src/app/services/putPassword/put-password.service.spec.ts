import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PutPasswordService } from './put-password.service';
import { environment } from 'src/environments/environment.development';
import { PutPassword } from '../../models/putPassword/putPassword';

describe('PutPasswordService', () => {
  let service: PutPasswordService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PutPasswordService]
    });
    service = TestBed.inject(PutPasswordService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a PUT request to update the password', () => {
    const mockData: PutPassword = {
      trigramme : 'dny',
      password: 'oldPassword123',
      newPassword: 'newPassword123'
    };

    service.putPassword(mockData).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/user/putMdp`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockData);

    req.flush({ success: true }); // Simuler une réponse de succès du serveur
  });
});
