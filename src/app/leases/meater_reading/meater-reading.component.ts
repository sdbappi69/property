import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'robi-meater-reading',
  templateUrl: './meater-reading.component.html',
  styleUrls: ['./meater-reading.component.scss']
})
export class MeaterReadingComponent implements OnInit {

  leaseID: string;
  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.leaseID = this.route.snapshot.paramMap.get('id');
  }

}
