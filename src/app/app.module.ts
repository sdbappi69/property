import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ConfirmationDialogComponent } from './shared/delete/confirmation-dialog-component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {
  DefaultDataServiceConfig,
  EntityDataModule,
  HttpUrlGenerator,
} from '@ngrx/data';
import { JwtInterceptor } from './core/jwt.interceptor';
import { AppHttpUrlGenerator } from './core/app-http-url-generator';
import { ErrorInterceptor } from './core/error-handler/error.interceptor';
import { AuthenticationModule } from './authentication/authentication.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { StatementComponent } from './accounting/statement/statement.component';
import { PdfStatementComponent } from './accounting/pdf-statement/pdf-statement.component';
import { CollectionReportComponent } from './reports/admin/collection-report/collection-report.component';
import { DetailClientSummaryReportComponent } from './reports/admin/detail-client-summary-report/detail-client-summary-report.component';
import { DueStatementReportComponent } from './reports/admin/due-statement-report/due-statement-report.component';
import { MonthlyInvoiceReportComponent } from './reports/admin/monthly-invoice-report/monthly-invoice-report.component';
import { NoticeReportComponent } from './reports/admin/notice-report/notice-report.component';
import { VatTaxReportComponent } from './reports/admin/vat-tax-report/vat-tax-report.component';
import { DetailTenantReportComponent } from './reports/landlord/detail-tenant-report/detail-tenant-report.component';
import { ItemWiseCollectionReportComponent } from './reports/landlord/item-wise-collection-report/item-wise-collection-report.component';
import { NoticeReportReportComponent } from './reports/landlord/notice-report-report/notice-report-report.component';
import { ServiceChargeReportComponent } from './reports/landlord/service-charge-report/service-charge-report.component';
import { TenantCollectionReportComponent } from './reports/tenant/tenant-collection-report/tenant-collection-report.component';
import { TenantDueStatementReportComponent } from './reports/tenant/tenant-due-statement-report/tenant-due-statement-report.component';
import { TenantMonthlyInvoiceReportComponent } from './reports/tenant/tenant-monthly-invoice-report/tenant-monthly-invoice-report.component';
import { TenantNoticeReportComponent } from './reports/tenant/tenant-notice-report/tenant-notice-report.component';
import { TenantServiceChargeReportComponent } from './reports/tenant/tenant-service-charge-report/tenant-service-charge-report.component';
import { TenantVatTaxReportComponent } from './reports/tenant/tenant-vat-tax-report/tenant-vat-tax-report.component';
import { LandlordCollectionReportComponent } from './reports/landlord/collection-report/collection-report.component';
import { LandlordDueStatementReportComponent } from './reports/landlord/due-statement-report/due-statement-report.component';
import { LandlordMonthlyInvoiceReportComponent } from './reports/landlord/monthly-invoice-report/monthly-invoice-report.component';
import { LandlordVatTaxReportComponent } from './reports/landlord/vat-tax-report/vat-tax-report.component';
// import { ReportsComponent } from './reports/reports.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost/2020/Rental/api/public/api/v1',
  timeout: 1000 * 60,
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AuthenticationModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EntityDataModule.forRoot({})
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ConfirmationDialogComponent,
    StatementComponent,
    PdfStatementComponent,
    CollectionReportComponent,
    LandlordCollectionReportComponent,
    LandlordMonthlyInvoiceReportComponent,
    LandlordDueStatementReportComponent,
    LandlordVatTaxReportComponent,
    DetailClientSummaryReportComponent,
    DueStatementReportComponent,
    MonthlyInvoiceReportComponent,
    NoticeReportComponent,
    VatTaxReportComponent,
    DetailTenantReportComponent,
    ItemWiseCollectionReportComponent,
    NoticeReportReportComponent,
    ServiceChargeReportComponent,
    TenantCollectionReportComponent,
    TenantDueStatementReportComponent,
    TenantMonthlyInvoiceReportComponent,
    TenantNoticeReportComponent,
    TenantServiceChargeReportComponent,
    TenantVatTaxReportComponent,
    // ReportsComponent
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HttpUrlGenerator, useClass: AppHttpUrlGenerator },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor () {
  }
}
