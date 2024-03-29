import { Routes, RouterModule } from '@angular/router';
import { LeaseComponent } from './lease.component';
import { AddLeaseComponent } from './add/add-lease.component';
import { ViewLeaseComponent } from './view/view-lease.component';
import { ViewLeaseGeneralComponent } from './view/general/view-lease-general.component';
import { CreateLeaseResolverService } from './data/create-lease-resolver.service';
import { LeaseInvoiceComponent } from './view/invoice/lease-invoice.component';
import { LeaseDocumentComponent } from './view/document/lease-document.component';
import { LeaseGeneralSettingResolverService } from '../settings/lease/general/data/lease-general-setting-resolver.service';
import { LeaseStatementComponent } from './statement/lease-statement.component';
import { MeaterReadingComponent } from './meater_reading/meater-reading.component';
import { MeaterReadingAddComponent } from './meater-reading-add/meater-reading-add.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: LeaseComponent,
       /* resolve: {
            landlords: PropertyResolverService
        }*/
    },
    {
        path: 'create',
        component: AddLeaseComponent,
      /*  resolve: {
            properties: CreateLeaseResolverService
        }*/
    },
    {
        path: ':id',
        component: ViewLeaseComponent,
        /*resolve : { member: LandlordResolverService},*/
        children: [
            { path: '', component: ViewLeaseGeneralComponent },
            { path: 'invoices', component: LeaseInvoiceComponent },
            { path: 'documents', component: LeaseDocumentComponent }
        ]
    },
    {
        path: ':id/edit',
        component: AddLeaseComponent
    },
    {
        path: ':id/lease-meter-reading',
        component: MeaterReadingComponent
    },
    {
        path: ':id/lease-meter-create',
        component: MeaterReadingAddComponent
    },
    {
        path: ':id/lease-meter-create/:meaterId',
        component: MeaterReadingAddComponent
    },
];


export const LeaseRoutingModule = RouterModule.forChild(ROUTES);
