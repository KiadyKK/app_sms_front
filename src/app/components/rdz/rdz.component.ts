import { Rdz } from 'src/app/models/rdz/rdz.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user.model';
import { RdzService } from 'src/app/services/rdz/rdz.service';
import { Zone } from './../../models/zone/zone.model';
import { ZoneService } from './../../services/zone/zone.service';

const createFormUser = () => ({
  zone: new FormControl<any>('', [Validators.required]),
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
  nom: string = '';

  zones: Zone[] = [];

  rdzs: Rdz[] = [];
  addMode: boolean = false;

  form = new FormGroup(createFormUser());

  constructor(
    private zoneService: ZoneService,
    private rdzService: RdzService
  ) {}

  ngOnInit(): void {
    this.getZone();
    this.getRdz();
  }

  getZone(): void {
    this.zoneService.getAll('').subscribe({
      next: (data: any) => {
        this.zones = data;
      },
    });
  }

  getRdz(): void {
    this.rdzService.getAll(this.nom).subscribe({
      next: (data: any) => {
        this.rdzs = data;
      },
    });
  }

  addRow(): void {
    this.addMode = true;
  }

  onSubmit(): void {
    this.form.value.zone = this.form.value.zone.id;
    this.rdzService.addRdz(this.form.value).subscribe({
      next: (data: any) => {
        this.reset();
        this.getRdz();
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

  remove(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce responsable ?')) {
      this.rdzService.remove(id).subscribe({
        next: (data: any) => {
          this.getRdz();
        },
      });
    }
  }
}
