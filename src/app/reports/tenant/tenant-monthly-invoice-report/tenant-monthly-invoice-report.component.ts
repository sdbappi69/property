import { Component, AfterViewInit, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ReportService } from 'app/reports/report.service';
import { ReportDataSource } from '../../report-data.source';
import * as FileSaver from 'file-saver';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-tenant-monthly-invoice-report',
  templateUrl: './tenant-monthly-invoice-report.component.html',
  styleUrls: ['./tenant-monthly-invoice-report.component.scss']
})
export class TenantMonthlyInvoiceReportComponent implements AfterViewInit {
  title = 'htmltopdf';
  @ViewChild('pdfTable') pdfTable: ElementRef;
  
  dataSource: ReportDataSource;
  exportList: any[] = [];
  exportHeader: any[] = [];
  allDataList: any[] = [];
  searchData: any = {
    landlord: null,
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


    this.dataSource.reportLoad('/custom-reports/monthly-invoice');
    this.dataSource.meta$.subscribe((res) => {
      if (Object.getOwnPropertyNames(res).length !== 0) {
        this.exportList = res['reports'];
        this.allDataList = res['reports'];
        this.exportHeader = res['headers'];

        this.displayedColumns = res['headers'];
        this.dataSource1 = new MatTableDataSource<any>(res['reports']);;
      }
    });
  }

  async exportReport() {
    this.dataSource.reportLoad('/custom-reports/monthly-invoice')

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
    if (this.exportList?.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.exportList);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Collection_report");
      });
    }
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  modelChanged() {
    let foundDevices: any = this.allDataList;

    foundDevices = this.searchData.landlord?.length ? this.allDataList.filter(item => {
      return this.searchData.landlord?.length === 0 || item['Landlord Name'].toLowerCase().includes(this.searchData.landlord.toLowerCase())
    }) : foundDevices;

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

  public downloadAsPDF() {
    const doc = new jsPDF('l', 'mm', [297, 210]);
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = {
      pageSize: {
        width: 891,
        height: 630
      },
      pageOrientation: 'landscape',
      pageMargins: [0, 0, 0, 0],
      content: html
    };
    pdfMake.createPdf(documentDefinition).open();
  }
}
