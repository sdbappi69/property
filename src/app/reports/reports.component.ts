import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromEvent, merge, Observable } from 'rxjs';
import { AppState } from '../reducers';
import { AuthenticationService } from '../authentication/authentication.service';
import {
  selectorIsAgent,
  selectorIsLandlord,
  selectorIsTenant
} from '../authentication/authentication.selectors';
import { tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
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

export const LANDLORD_ROUTES: RouteInfo[] = [
  { path: 'landlord-collection-report', title: 'Collections', icon: '', class: '', permission: ['settings-general'], activeOption: true },
  { path: 'landlord-detail-tenant-report', title: 'Tenant Summary', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'landlord-due-statement-report', title: 'Due Statement', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'landlord-monthly-invoice-report', title: 'Monthly Invoice', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'landlord-item-wise-collection-report', title: 'Item Wise Collection', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'notice_report', title: 'Notice', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'vat_tax_report', title: 'Vat Tax', icon: '', class: '', permission: ['settings-users'], activeOption: false },
];

export const TENANT_ROUTES: RouteInfo[] = [
  { path: 'tenant-collection-report', title: 'Collections', icon: '', class: '', permission: ['settings-general'], activeOption: true },
  { path: 'tenant-due-statement-report', title: 'Due Statement', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'tenant-monthly-invoice-report', title: 'Monthly Invoice', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'tenant-notice-report', title: 'Notice', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'tenant-service-charge-report', title: 'Service Charge', icon: '', class: '', permission: ['settings-users'], activeOption: false },
  { path: 'tenant-vat-tax-report', title: 'Vat Tax', icon: '', class: '', permission: ['settings-users'], activeOption: false },
];

@Component({
  selector: 'robi-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  menuItemsAdmin: any[];
  menuItemsLandlord: any[];
  menuItemsTenant: any[];


  isLandlord$: any;
  isTenant$: any;
  isAgent$: any;
  isAdmin$: Observable<boolean>;

  isLandlord(): boolean {
    let landlord = false;
    this.store.pipe(select(selectorIsLandlord)).subscribe(isLandlord => landlord = isLandlord);
    return landlord;
  };
  isAgent(): boolean {
    let agent = false;
    this.store.pipe(select(selectorIsAgent)).subscribe(isAgent => agent = isAgent);
    return agent;
  };
  isTenant(): boolean {
    let tenant = false;
    this.store.pipe(select(selectorIsTenant)).subscribe(isTenant => tenant = isTenant);
    return tenant;
  }


  constructor(private store: Store<AppState>, private router: Router, private auth: AuthenticationService,
    private authenticationService: AuthenticationService,) {

    this.isAgent$ = this.store.pipe(select(selectorIsAgent));
    this.isLandlord$ = this.store.pipe(select(selectorIsLandlord));
    this.isTenant$ = this.store.pipe(select(selectorIsTenant));
    this.isAdmin$ = this.authenticationService.isAdmin();
  }

  ngOnInit() {
    this.menuItemsAdmin = ROUTES.filter(menuItem => menuItem);
    this.menuItemsLandlord = LANDLORD_ROUTES.filter(menuItem => menuItem);
    this.menuItemsTenant = TENANT_ROUTES.filter(menuItem => menuItem);

    console.log('abc', this.isLandlord());
    console.log("agent", this.isAgent());
    console.log("isTenant", this.isTenant());
    // this.router.navigate(['/login']);
    
  }
}
