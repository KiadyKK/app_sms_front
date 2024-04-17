import { Component, Injectable, OnInit } from '@angular/core';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { Kpi } from './../../models/kpi/kpi.model';
import { DwhService } from './../../services/dwh/dwh.service';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}
const getDate = (): string => {
  const now = new Date();
  const day = now.getDate() - 1;
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return day + '-' + month + '-' + year;
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  noData: boolean = false;
  date: string = '';
  kpis: Kpi[] = [];

  constructor(private dwhService: DwhService) { }
  showNoData(): void {
    this.noData = true
  }
  showData(): void {
    this.noData = false
  }

  ngOnInit(): void {
    this.date = getDate();
    this.getKpi();
  }

  getKpi(): void {
    const d: string[] = this.date.split('-');
    const month = d[1].length === 1 ? '0' + d[1] : d[1];
    const day = d[0].length === 1 ? '0' + d[0] : d[0];
    const jour: string = d[2] + '-' + month + '-' + day;
    this.dwhService.getAll(jour).subscribe({
      next: (data: any) => {
        console.log(data)
        this.kpis = data;
        if (this.kpis.length == 0) {
          this.showNoData()
        } else {
          this.showData()
        }
      },
    });
  }

  getKpiDwh(): void {
    const d: string[] = this.date.split('-');
    const month = d[1].length === 1 ? '0' + d[1] : d[1];
    const day = d[0].length === 1 ? '0' + d[0] : d[0];
    const jour: string = d[2] + '-' + month + '-' + day;
    this.dwhService.getAllDwh(jour).subscribe({
      next: (data: any) => {
        this.kpis = data;
      },
    });
  }
  getTotalParc(): number {
    return this.kpis
      .filter((item) => item.parc)
      .reduce((total, item) => total + item.parc, 0);
  }
  getTotalActivation(): number {
    return this.kpis
      .filter((item) => item.activation)
      .reduce((total, item) => total + item.activation, 0);
  }
  getTotatCumulActivation(): number {
    return this.kpis
      .filter((item) => item.cumul_activation)
      .reduce((total, item) => total + item.cumul_activation, 0);
  }
  getTotatMttRec(): number {
    return this.kpis
      .filter((item) => item.mtt_rec)
      .reduce((total, item) => total + item.mtt_rec, 0);
  }
  getTotatCumulMttRec(): number {
    return this.kpis
      .filter((item) => item.cumul_mtt_rec)
      .reduce((total, item) => total + item.cumul_mtt_rec, 0);
  }
  getTotatCb7Jours(): number {
    return this.kpis
      .filter((item) => item.cb_7j)
      .reduce((total, item) => total + item.cb_7j, 0);
  }
  getTotatCb30Jours(): number {
    return this.kpis
      .filter((item) => item.cb_30j)
      .reduce((total, item) => total + item.cb_30j, 0);
  }
  sendSms(): void {
    const d: string[] = this.date.split('-');
    const month = d[1].length === 1 ? '0' + d[1] : d[1];
    const day = d[0].length === 1 ? '0' + d[0] : d[0];
    const jour: string = d[2] + '-' + month + '-' + day;
    this.dwhService.sendSms(jour).subscribe({
      next: (data: any) => { },
    });
  }

  floatNumberWithSpaces(x: number | string): string {
    let parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }
}
