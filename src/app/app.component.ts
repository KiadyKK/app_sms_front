import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tri: string;
  isLoggedIn: boolean;
  role: number;
  title: string = "app_sms_front"

  constructor(
    private storageService: StorageService,
    private bnIdle: BnNgIdleService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.getItem('authorization');
    this.role = +this.storageService.getItem('role');

    if (this.isLoggedIn) {
      const tri = this.storageService.getItem('tri');
      this.tri = tri;
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
