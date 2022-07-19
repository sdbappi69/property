import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';

import * as _moment from 'moment';
import * as moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {Moment} from 'moment';
// const moment = _rollupMoment || _moment;
import { LeaseService } from '../data/lease.service';

@Component({
  selector: 'robi-meater-reading',
  templateUrl: './meater-reading.component.html',
  styleUrls: ['./meater-reading.component.scss']
})
export class MeaterReadingComponent implements OnInit {

  leaseID: string;
  formErrors: any;
  date = new FormControl(moment());
  monthYear: any = new Date(); //moment().format('MM/YYYY');
  meaterReading: string;

  constructor(
    private route: ActivatedRoute,
    private leaseService: LeaseService,) { }

  ngOnInit(): void {
    this.leaseID = this.route.snapshot.paramMap.get('id');
  }

  showValue(date: any) {
    return date ? moment(date).format('MM/YYYY') : ''
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.monthYear = new Date(moment(normalizedMonthAndYear).format('YYYY, MM')); //moment(normalizedMonthAndYear).format('MM/YYYY');
    datepicker.close();
  }

  createMeaterReading() {
    let data = {
      lease_id: this.leaseID,
      month: parseInt(moment(this.monthYear).format('MM')),
      year: parseInt(moment(this.monthYear).format('YYYY')),
      reading: parseInt(this.meaterReading)
    };

    this.leaseService.createMeater(data).subscribe((data) => {

      },
      (error) => {

      }
    );

    
    
  }
  

}
