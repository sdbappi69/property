import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';

import * as _moment from 'moment';
import * as moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
// const moment = _rollupMoment || _moment;
import { LeaseService } from '../data/lease.service';

@Component({
  selector: 'app-meater-reading-add',
  templateUrl: './meater-reading-add.component.html',
  styleUrls: ['./meater-reading-add.component.scss']
})
export class MeaterReadingAddComponent implements OnInit {
  leaseID: string;
  formErrors: any;
  date = new FormControl(moment());
  monthYear: any = new Date(); //moment().format('MM/YYYY');
  meaterReading: string;
  leaseInfo: any;
  selectedLease: any;
  meaterId: string;


  constructor(private route: ActivatedRoute,
    private leaseService: LeaseService,
    private router: Router,
    private notification: NotificationService) { }

  ngOnInit(): void {
    this.leaseID = this.route.snapshot.paramMap.get('id');
    let month: string = this.route.snapshot.queryParamMap.get('month');
    let year: string = this.route.snapshot.queryParamMap.get('year');
    this.meaterReading = this.route.snapshot.queryParamMap.get('reading');

    this.monthYear = new Date(moment(`${year}, ${month}`, 'YYYY, MM').format('YYYY, MM'));
  }

  showValue(date: any) {
    return date ? moment(date).format('MM/YYYY') : ''
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.monthYear = new Date(moment(normalizedMonthAndYear).format('YYYY, MM')); //moment(normalizedMonthAndYear).format('MM/YYYY');
    datepicker.close();
  }

  dateFormat(date) {
    return moment(date).format('YYYY-MM-DD')
  }

  onSelected(item) {
    this.selectedLease = item;
    this.monthYear = new Date(moment(`${item.year}, ${item.month}`, 'YYYY, MM').format('YYYY, MM'));
    this.meaterReading = item.reading
  }

  createMeaterReading() {
    let data = {
      lease_id: this.leaseID,
      month: parseInt(moment(this.monthYear).format('MM')),
      year: parseInt(moment(this.monthYear).format('YYYY')),
      reading: parseInt(this.meaterReading)
    };

    this.leaseService.createMeater(data).subscribe((data) => {
      this.notification.showNotification('success', 'Success !! Meater Reading created.');
      // this.onSaveComplete();
      this.router.navigate([`/leases/${this.leaseID}/lease-meter-reading`]);
    },
      (error) => {
        this.notification.showNotification('danger', error?.error?.message || 'Check your connection and retry.');
        return;
        // if (error.lease === 0) {
        //   this.notification.showNotification('danger', 'Connection Error !! Nothing created.' +
        //     ' Check your connection and retry.');
        //   return;
        // }
      }
    );
  }

}
