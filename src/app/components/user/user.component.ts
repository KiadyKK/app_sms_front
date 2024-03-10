import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

const createFormUser = () => ({
  nom: new FormControl<string>('', [Validators.required]),
  prenom: new FormControl<string>('', [Validators.required]),
  email: new FormControl<string>('', [Validators.email]),
  tel: new FormControl<string>(''),
  tri: new FormControl<string>('', [
    Validators.minLength(3),
    Validators.required,
  ]),
});

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  nom: string = '';
  users: User[] = [];
  addMode: boolean = false;

  form = new FormGroup(createFormUser());

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }

  addRow(): void {
    this.addMode = true;
  }

  onSubmit(): void {
    this.userService.addUser(this.form.value).subscribe({
      next: (data: any) => {
        this.reset();
        this.getAll();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset(): void {
    this.form = new FormGroup(createFormUser());
    this.addMode = false;
  }

  getAll(): void {
    this.userService.getAll(this.nom).subscribe({
      next: (data: any) => {
        this.users = data;
      },
    });
  }

  remove(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.remove(id).subscribe({
        next: (data: any) => {
          this.getAll();
        },
      });
    }
  }
}
