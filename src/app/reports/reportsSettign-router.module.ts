import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import {CollectionReportComponent} from "./admin/collection-report/collection-report.component";
import {DetailClientSummaryReportComponent} from "./admin/detail-client-summary-report/detail-client-summary-report.component"
import {DueStatementReportComponent} from "./admin/due-statement-report/due-statement-report.component";
import {MonthlyInvoiceReportComponent} from "./admin/monthly-invoice-report/monthly-invoice-report.component";
import {NoticeReportComponent} from "./admin/notice-report/notice-report.component";
import {VatTaxReportComponent} from "./admin/vat-tax-report/vat-tax-report.component"


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
        ]
    }
];

export const ReportSettingRoutingModule = RouterModule.forChild(ROUTES);
