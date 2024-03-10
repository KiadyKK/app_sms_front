import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    sessionStorage.clear();
  }

  public saveUser(data: any): void {
    this.clean();

    const { user, token } = data;
    sessionStorage.setItem(
      'id',
      AES.encrypt(user.id.toString(), 'MYKEY4DEMO').toString()
    );
    sessionStorage.setItem(
      'tri',
      AES.encrypt(user.tri, 'MYKEY4DEMO').toString()
    );
    sessionStorage.setItem(
      'role',
      AES.encrypt(user.role.toString(), 'MYKEY4DEMO').toString()
    );
    sessionStorage.setItem(
      'authorization',
      AES.encrypt(token, 'MYKEY4DEMO').toString()
    );
  }

  public getItem(key: string): any {
    const item = sessionStorage.getItem(key)
      ? sessionStorage.getItem(key)
      : false;
    if (item) {
      const decrypted = AES.decrypt(item, 'MYKEY4DEMO');
      const decryptedString = decrypted.toString(enc.Utf8);
      return decryptedString;
    }

    return null;
  }
}
