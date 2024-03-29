import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'app/reports/report.service';
import { ReportDataSource } from '../../report-data.source';
import * as FileSaver from 'file-saver';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-service-charge-report',
  templateUrl: './service-charge-report.component.html',
  styleUrls: ['./service-charge-report.component.scss']
})
export class ServiceChargeReportComponent implements AfterViewInit {
  dataSource: ReportDataSource;
  exportList: any[] = [];
  exportHeader: any[] = [];
  allDataList: any[] = [];
  searchData: any = {
    lease: null,
    tenant: null,
    property: null,
    propertyType: null
  }
  displayedColumns: string[] = [];
  dataSource1 = new MatTableDataSource<any>();

  constructor(private reportService: ReportService,) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource1.paginator = this.paginator;
    setTimeout(() => {
      this.dataSource1.paginator = this.paginator
    }, 1000);
  }

  ngOnInit(): void {
    this.dataSource = new ReportDataSource(this.reportService);

    this.dataSource.reportLoad('/custom-reports/service-charge');
    this.dataSource.meta$.subscribe((res) => {
      if (Object.getOwnPropertyNames(res).length !== 0) {
        this.exportList = res['reports'];
        this.allDataList = res['reports'];
        this.exportHeader = res['headers'];

        this.displayedColumns = res['headers'];
        this.dataSource1 = new MatTableDataSource<any>(res['reports']);
      }
    });
  }

  async exportReport() {
    this.dataSource.reportLoad('/custom-reports/service-charge')

    this.dataSource.meta$.subscribe((res) => {
      if (Object.getOwnPropertyNames(res).length !== 0) {
        this.exportHeader = res['headers'];
        this.exportList = res['reports'];

        console.log("hello", res);

        if (this.exportHeader?.length) {
          setTimeout(() => {
            this.exportExcel();
          }, 1000);
        }
      }
    });

  }

  exportExcel() {
    // if (this.exportList?.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.exportList);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Collection_report");
      });
    // }
  }

  modelChanged() {
    let foundDevices: any = this.allDataList;

    foundDevices = this.searchData?.lease?.length ? this.allDataList.filter(item => {
      return this.searchData.lease?.length === 0 || item['Lease'].toLowerCase().includes(this.searchData.lease.toLowerCase())
    }) : foundDevices;

    foundDevices = this.searchData?.property?.length ? this.allDataList.filter(item => {
      return this.searchData.property?.length === 0 || item['Property Name'].toLowerCase().includes(this.searchData.property.toLowerCase())
    }) : foundDevices;

    foundDevices = this.searchData.propertyType ? this.allDataList.filter(item => {
      return item['Property Type'] === this.searchData.propertyType
    }) : foundDevices;

    foundDevices = this.searchData.tenant?.length ? this.allDataList.filter(item => {
      return this.searchData.tenant.length === 0 || item['Tenant Name'].toLowerCase().includes(this.searchData.tenant.toLowerCase())
    }) : foundDevices;

    this.dataSource1 = foundDevices;
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
