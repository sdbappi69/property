import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../shared/delete/confirmation-dialog-component';
import { AddTenantComponent } from './add/add-tenant.component';
import { TenantModel } from './models/tenant-model';
import { TenantDataSource } from './data/tenant-data.source';
import { NotificationService } from '../shared/notification.service';
import { TenantService } from './data/tenant.service';
import { PropertyModel } from '../properties/models/property-model';
import { AuthenticationService } from '../authentication/authentication.service';
import * as moment from 'moment';
import { UserSettingService } from '../settings/user/data/user-setting.service';
import { USER_SCOPES } from '../shared/enums/user-scopes.enum';
import { LandlordService } from '../landlords/data/landlord.service';
@Component({
    selector: 'robi-properties',
    templateUrl: './tenant.component.html',
    styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit, AfterViewInit {

    displayedColumns = [
        'first_name',
        'last_name',
        'gender',
        'phone',
        'actions'
    ];

    loader = false;
    activeUser: any;

    dialogRef: MatDialogRef<ConfirmationDialogComponent>;

    dataSource: TenantDataSource;
    isLandlord = false;
    landlordID: string;

    // Search field
    @ViewChild('search') search: ElementRef;

    // pagination
    @ViewChild(MatPaginator, {static: true }) paginator: MatPaginator;

    // Pagination
    length: number;
    pageIndex = 0;
    pageSizeOptions: number[] = [10, 25, 50, 100];
    meta: any;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    isAdmin$: Observable<boolean>;
    filter = {
        startdate: '',
        endDate: '',
        confirmed: ''
    };
    constructor(private tenantService: TenantService,
                private landlordService: LandlordService,
                private notification: NotificationService,
                private authenticationService: AuthenticationService,
                private userService: UserSettingService,
                private dialog: MatDialog) {
        this.isAdmin$ = this.authenticationService.isAdmin();
        this.activeUser = this.userService.getActiveUser();
        this.isLandlord = this.landlordService.isLandlord();
        this.landlordID = this.landlordService.getLoggedInLandlordID();
    }

    /**
     * Initialize data lead
     * Set pagination data values
     * Initial data load
     */
    ngOnInit() {
        this.dataSource = new TenantDataSource(this.tenantService);
        // Load pagination data
        this.dataSource.meta$.subscribe((res) => this.meta = res);
        // We load initial data here to avoid affecting life cycle hooks if we load all data on after view init

        switch (this.activeUser?.userType) {
            case USER_SCOPES.ADMIN: {
                this.dataSource.load('', 0, 10, 'first_name', 'desc');
                break;
            }
            case USER_SCOPES.LANDLORD: {
                this.dataSource.loadNested(
                    this.landlordService.nestedTenantsUrl(this.activeUser?.userID),
                    '', 0, 10);
                break;
            }
            // case USER_SCOPES.TENANT: {
            //     this.dataSource.loadNested(
            //         this.tenantService.nestedPropertiesUrl(this.activeUser?.userID),
            //         '', 0, 0);
            //     break;
            // }
        }
    }

    /**
     * Handle search and pagination
     */
    ngAfterViewInit() {
        fromEvent(this.search.nativeElement, 'keyup')
            .pipe(
                debounceTime(1000),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadData();
                })
            ).subscribe();

        this.paginator.page.pipe(
            tap(() => this.loadData() )
        ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadData())
            )
            .subscribe();
    }

    /**
     * Fetch data from data lead
     */
    loadData() {
        switch (this.activeUser?.userType) {
            case USER_SCOPES.ADMIN: {
                this.dataSource.load(
                    this.search.nativeElement.value,
                    (this.paginator.pageIndex + 1),
                    (this.paginator.pageSize),
                    this.sort.active,
                    this.sort.direction,
                    '', '',
                    this.filter.startdate,
                    this.filter.endDate,
                    this.filter.confirmed
                );        
                break;
            }
            case USER_SCOPES.LANDLORD: {
                this.dataSource.loadNested(
                    this.landlordService.nestedTenantsUrl(this.activeUser?.userID),
                    this.search.nativeElement.value,
                    (this.paginator.pageIndex + 1),
                    (this.paginator.pageSize),
                    this.sort.active,
                    this.sort.direction,
                    '', '',
                    this.filter.startdate,
                    this.filter.endDate,
                    this.filter.confirmed
                );
                break;
            }
            // case USER_SCOPES.TENANT: {
            //     console.log("216");
                
            //     this.dataSource.loadNested(
            //         this.tenantService.nestedPropertiesUrl(this.activeUser?.userID),
            //         this.search.nativeElement.value,
            //         (this.paginator.pageIndex + 1),
            //         (this.paginator.pageSize),
            //         this.sort.active,
            //         this.sort.direction,
            //         '', '',
            //         this.filter.startdate,
            //         this.filter.endDate,
            //         this.filter.confirmed
            //     );
            //     break;
            // }
        }
    }

    statusFilter(val) {
        this.filter.confirmed = val;
        this.loadData();
    }

    dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
        this.filter.startdate = moment(dateRangeStart.value, 'DD/MM/YYYY').format('YYYY-MM-DD');
        this.filter.endDate = moment(dateRangeEnd.value, 'DD/MM/YYYY').format('YYYY-MM-DD');
        this.loadData();
    }

    /**
     * Empty search box
     */
    clearSearch() {
        this.search.nativeElement.value = '';
        this.loadData()
    }

    /**
     * Add dialog launch
     */
    addDialog(mode: string, landlord?: TenantModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {landlord,
            mode: mode
        };

        const dialogRef = this.dialog.open(AddTenantComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            (val) => {
                if ((val)) {
                   // this.loadData();
                }
            }
        );
    }

    /**
     * Open Edit form
     * @param landlord
     */
    openConfirmationDialog(landlord: TenantModel) {

        this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            disableClose: true
        });

        this.dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.delete(landlord);
            }
            this.dialogRef = null;
        });
    }

    /**
     * Remove resource from db
     * @param landlord
     */
   delete(landlord: TenantModel) {
       // this.loader = true;
     /*   this.service.delete(lead)
            .subscribe((data) => {
                    this.loader = false;
                    this.loadData();
                    this.notification.showNotification('success', 'Success !! Lead has been deleted.');
                },
                (error) => {
                    this.loader = false;
                    if (!error.error['error']) {
                        this.notification.showNotification('danger', 'Connection Error !! Nothing deleted.' +
                            ' Check Connection and retry. ');
                    } else {
                        this.notification.showNotification('danger', 'Delete Error !! ');
                    }
                });*/
    }

    /**
     * @param tenant
     */
    onSelected(tenant: TenantModel): void {
        this.tenantService.changeSelectedTenant(tenant);
    }
}
