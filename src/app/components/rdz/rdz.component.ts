import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

const createFormUser = () => ({
  zone: new FormControl<Object>('', [Validators.required]),
  nom: new FormControl<string>('', [Validators.required]),
  prenom: new FormControl<string>('', [Validators.required]),
  email: new FormControl<string>('', [Validators.email]),
  tel: new FormControl<string>('', [Validators.required]),
  tri: new FormControl<string>('', [
    Validators.minLength(3),
    Validators.required,
  ]),
});

@Component({
  selector: 'app-rdz',
  templateUrl: './rdz.component.html',
  styleUrls: ['./rdz.component.scss'],
})
export class RdzComponent implements OnInit {
  fruit: any;

  fruits = [
    { id: 1, name: 'anana' },
    { id: 2, name: 'pine' },
    { id: 3, name: 'apple' },
    { id: 4, name: 'peach' },
    { id: 5, name: 'avacado' },
  ];

  isSubmitted: boolean = false;

  // form: FormGroup;

  nom: string = '';
  users: User[] = [];
  addMode: boolean = false;

  form = new FormGroup(createFormUser());

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   selectedFruit: [],
    //   description: [''],
    // });
  }

  onPost = () => (this.isSubmitted = true);

  addRow(): void {
    this.addMode = true;
  }

  onSubmit(): void {
    console.log(this.form.value);
    // this.userService.addUser(this.form.value).subscribe({
    //   next: (data: any) => {
    //     this.reset();
    //     this.getAll();
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    // });
  }

  reset(): void {
    this.form = new FormGroup(createFormUser());
    this.addMode = false;
  }

  getAll(): void {
    // this.userService.getAll(this.nom).subscribe({
    //   next: (data: any) => {
    //     this.users = data;
    //   },
    // });
  }

  remove(id: number): void {
    // if (confirm('Voulez-vous vraiment supprimer ce responsable ?')) {
    //   this.userService.remove(id).subscribe({
    //     next: (data: any) => {
    //       this.getAll();
    //     },
    //   });
    // }
  }
}
