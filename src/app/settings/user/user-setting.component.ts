import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { selectorIsLandlord, selectorIsAgent } from '../../authentication/authentication.selectors';
@Component({
    selector: 'robi-user-setting',
    templateUrl: './user-setting.component.html',
    styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent {

    isLandlord$: any;
    isAgent$: any;

    constructor(private store: Store<AppState>) {
        this.isAgent$ = this.store.pipe(select(selectorIsAgent));
        this.isLandlord$ = this.store.pipe(select(selectorIsLandlord));
    }
}
