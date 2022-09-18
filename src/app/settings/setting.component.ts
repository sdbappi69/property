import { Component, OnInit } from '@angular/core';
import { AppState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { selectorIsLandlord } from '../authentication/authentication.selectors';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    permission?: any;
    activeOption?: any;
}
export const ROUTES: RouteInfo[] = [
    { path: '/settings', title: 'System',  icon: '', class: '', permission: ['settings-general'], activeOption: true },
    { path: 'property', title: 'Property',  icon: '', class: '', permission: ['settings-users'], activeOption: false },
    { path: 'lease', title: 'Lease',  icon: '', class: '', permission: ['settings-users'], activeOption: false },
    { path: 'tenant', title: 'Tenant',  icon: '', class: '', permission: ['settings-users'], activeOption: false },
    { path: 'email', title: 'Email & SMS',  icon: '', class: '', permission: ['settings-users'], activeOption: false },
    { path: 'payments', title: 'Payment',  icon: '', class: '', permission: ['settings-users'], activeOption: false },
    { path: 'user', title: 'Users & Roles',  icon: '', class: '', permission: ['settings-users'], activeOption: false }
];


export const ROUTES_LANDLORD: RouteInfo[] = [
    { path: 'user', title: 'Users & Roles',  icon: '', class: '', permission: ['settings-users'], activeOption: false }
];

@Component({
    selector: 'robi-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

    isLandlord(): boolean {
        let landlord = false;
        this.store.pipe(select(selectorIsLandlord)).subscribe(isLandlord => landlord = isLandlord);
        return landlord;
    };
    settingMenuItems: any[];


    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        if (this.isLandlord()) {
            this.settingMenuItems = ROUTES_LANDLORD.filter(menuItem => menuItem);
        } else {
            this.settingMenuItems = ROUTES.filter(menuItem => menuItem);
        }
    }

}
