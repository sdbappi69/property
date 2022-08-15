import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReportsComponent } from "./reports.component";
import { ReportSettingRoutingModule } from "./reportsSettign-router.module";


@NgModule({
  imports: [
    CommonModule,
    NgxMatSelectSearchModule,
    ReportSettingRoutingModule
  ],
  declarations: [
    ReportsComponent
  ],
  entryComponents: [
  ]
})
export class ReportsModule { }
