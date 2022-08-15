import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import {CollectionReportComponent} from "./admin/collection-report/collection-report.component";
import {DetailClientSummaryReportComponent} from "./admin/detail-client-summary-report/detail-client-summary-report.component"
import {DueStatementReportComponent} from "./admin/due-statement-report/due-statement-report.component";
import {MonthlyInvoiceReportComponent} from "./admin/monthly-invoice-report/monthly-invoice-report.component";
import {NoticeReportComponent} from "./admin/notice-report/notice-report.component";
import {VatTaxReportComponent} from "./admin/vat-tax-report/vat-tax-report.component"
import { LandlordCollectionReportComponent } from './landlord/collection-report/collection-report.component';
import { DetailTenantReportComponent } from './landlord/detail-tenant-report/detail-tenant-report.component';
import { LandlordDueStatementReportComponent } from './landlord/due-statement-report/due-statement-report.component';
import { ItemWiseCollectionReportComponent } from './landlord/item-wise-collection-report/item-wise-collection-report.component';
import { LandlordMonthlyInvoiceReportComponent } from './landlord/monthly-invoice-report/monthly-invoice-report.component';
import { NoticeReportReportComponent } from './landlord/notice-report-report/notice-report-report.component';
import { ServiceChargeReportComponent } from './landlord/service-charge-report/service-charge-report.component';
import { LandlordVatTaxReportComponent } from './landlord/vat-tax-report/vat-tax-report.component';
import { TenantCollectionReportComponent } from './tenant/tenant-collection-report/tenant-collection-report.component';
import { TenantDueStatementReportComponent } from './tenant/tenant-due-statement-report/tenant-due-statement-report.component';
import { TenantMonthlyInvoiceReportComponent } from './tenant/tenant-monthly-invoice-report/tenant-monthly-invoice-report.component';
import { TenantNoticeReportComponent } from './tenant/tenant-notice-report/tenant-notice-report.component';
import { TenantServiceChargeReportComponent } from './tenant/tenant-service-charge-report/tenant-service-charge-report.component';
import { TenantVatTaxReportComponent } from './tenant/tenant-vat-tax-report/tenant-vat-tax-report.component';


export const ROUTES: Routes = [
    {
        path: '',
        component: ReportsComponent,
        children: [
            {
                path: 'collection_report',
                component: CollectionReportComponent
            },
            {
                path: 'detail_client_summary_report',
                component: DetailClientSummaryReportComponent
            },
            {
                path: 'due_statement_report',
                component: DueStatementReportComponent
            },
            {
                path: 'monthly_invoice_report',
                component: MonthlyInvoiceReportComponent
            },
            {
                path: 'notice_report',
                component: NoticeReportComponent
            },
            {
                path: 'vat_tax_report',
                component: VatTaxReportComponent
            },

            {
                path: 'landlord-collection-report',
                component: LandlordCollectionReportComponent
            },
            {
                path: 'landlord-detail-tenant-report',
                component: DetailTenantReportComponent
            },
            {
                path: 'landlord-due-statement-report',
                component: LandlordDueStatementReportComponent
            },
            {
                path: 'landlord-item-wise-collection-report',
                component: ItemWiseCollectionReportComponent
            },
            {
                path: 'landlord-monthly-invoice-report',
                component: LandlordMonthlyInvoiceReportComponent
            },
            {
                path: 'landlord-notice-report',
                component: NoticeReportReportComponent
            },
            {
                path: 'landlord-service-charge-report',
                component: ServiceChargeReportComponent
            },
            {
                path: 'landlord-vat-tax-report',
                component: LandlordVatTaxReportComponent
            },
            {
                path: 'tenant-collection-report',
                component: TenantCollectionReportComponent
            },
            {
                path: 'tenant-due-statement-report',
                component: TenantDueStatementReportComponent
            },
            {
                path: 'tenant-monthly-invoice-report',
                component: TenantMonthlyInvoiceReportComponent
            },
            {
                path: 'tenant-notice-report',
                component: TenantNoticeReportComponent
            },
            {
                path: 'tenant-service-charge-report',
                component: TenantServiceChargeReportComponent
            },
            {
                path: 'tenant-vat-tax-report',
                component: TenantVatTaxReportComponent
            },
        ]
    }
];

export const ReportSettingRoutingModule = RouterModule.forChild(ROUTES);
