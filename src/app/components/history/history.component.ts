import { Component, OnInit } from '@angular/core';
import { DwhService } from 'src/app/services/dwh/dwh.service';
import { Hitoric } from './../../models/historic/hitoric.model';

const getDate = (): string => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return day + '-' + month + '-' + year;
};

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  date: string = getDate();
  historics: Hitoric[] = [];

  constructor(private dwhService: DwhService) {}

  ngOnInit(): void {
    this.getHistoric();
  }

  getHistoric(): void {
    const d: string[] = this.date.split('-');
    const month = d[1].length === 1 ? '0' + d[1] : d[1];
    const day = d[0].length === 1 ? '0' + d[0] : d[0];
    const jour: string = d[2] + '-' + month + '-' + day;
    this.dwhService.getHistoric(jour).subscribe({
      next: (data: any) => {
        this.historics = data;
      },
    });
  }
}
