import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { AES, enc } from 'crypto-js';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clean sessionStorage', () => {
    sessionStorage.setItem('test', 'value');
    service.clean();
    expect(sessionStorage.getItem('test')).toBeNull();
  });

  it('should save user data and encrypt it', () => {
    const mockUserData = {
      user: { id: 1, tri: 'DNY', role: 'admin' },
      token: 'sampleToken',
    };

    spyOn(service, 'clean').and.callThrough();
    service.saveUser(mockUserData);

    expect(service.clean).toHaveBeenCalled();
    expect(sessionStorage.getItem('id')).not.toBeNull();
    expect(sessionStorage.getItem('tri')).not.toBeNull();
    expect(sessionStorage.getItem('role')).not.toBeNull();
    expect(sessionStorage.getItem('authorization')).not.toBeNull();

    const decryptedId = AES.decrypt(sessionStorage.getItem('id')!, 'MYKEY4DEMO').toString(enc.Utf8);
    const decryptedTri = AES.decrypt(sessionStorage.getItem('tri')!, 'MYKEY4DEMO').toString(enc.Utf8);
    const decryptedRole = AES.decrypt(sessionStorage.getItem('role')!, 'MYKEY4DEMO').toString(enc.Utf8);
    const decryptedToken = AES.decrypt(sessionStorage.getItem('authorization')!, 'MYKEY4DEMO').toString(enc.Utf8);

    expect(decryptedId).toBe(mockUserData.user.id.toString());
    expect(decryptedTri).toBe(mockUserData.user.tri);
    expect(decryptedRole).toBe(mockUserData.user.role.toString());
    expect(decryptedToken).toBe(mockUserData.token);
  });

  it('should get and decrypt item from sessionStorage', () => {
    const mockValue = 'sampleValue';
    const encryptedValue = AES.encrypt(mockValue, 'MYKEY4DEMO').toString();
    sessionStorage.setItem('sampleKey', encryptedValue);

    const result = service.getItem('sampleKey');
    expect(result).toBe(mockValue);
  });

  it('should return null if item does not exist in sessionStorage', () => {
    const result = service.getItem('nonExistingKey');
    expect(result).toBeNull();
  });
});
