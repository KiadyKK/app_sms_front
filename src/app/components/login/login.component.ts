import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login/login.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: Login = {
    tri: '',
    mdp: '',
  };
  isLoginFailed = false;
  isLoggedIn: boolean = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const loggedIn = this.storageService.getItem('authorization');
    if (loggedIn) {
      this.router.navigate(['']);
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe({
      next: (data: any) => {
        if (data.hasOwnProperty('token')) {
          this.storageService.saveUser(data);
          location.reload();
        } else {
          this.errorMessage = 'Error';
          this.isLoginFailed = true;
        }
      },
      error: (err: any) => {
        this.isLoginFailed = true;
        this.errorMessage = err.error;
      },
    });
  }
}
