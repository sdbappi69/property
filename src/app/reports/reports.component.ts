import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permission?: any;
  activeOption?: any;
}
export const ROUTES: RouteInfo[] = [
  { path: 'collection_report', title: 'Collections', icon: '', class: '', permission: ['settings-general'], activeOption: true },
  { path: 'detail_client_summary_report', title: 'Client Summary', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'due_statement_report', title: 'Due Statement', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'monthly_invoice_report', title: 'Monthly Invoice', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'notice_report', title: 'Notice', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'vat_tax_report', title: 'Vat Tax', icon: '', class: '', permission: ['settings-users'], activeOption: false },
];

@Component({
  selector: 'robi-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  settingMenuItems: any[];
  
  constructor() { }

  ngOnInit() {
    this.settingMenuItems = ROUTES.filter(menuItem => menuItem);
  }
}
