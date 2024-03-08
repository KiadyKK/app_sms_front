import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  trigramme: string;
  isLoggedIn: boolean;

  constructor(
    private storageService: StorageService,
    private bnIdle: BnNgIdleService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.getItem('authorization');

    if (this.isLoggedIn) {
      const trigramme = this.storageService.getItem('trigramme');
      this.trigramme = trigramme;
    }

    this.bnIdle.startWatching(3600).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        this.logout();
        location.reload();
      }
    });
  }

  logout(): void {
    this.storageService.clean();
  }
}
