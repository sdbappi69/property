import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  selector: 'app-detail-tenant-report',
  templateUrl: './detail-tenant-report.component.html',
  styleUrls: ['./detail-tenant-report.component.scss']
})
export class DetailTenantReportComponent implements AfterViewInit {
  title = 'htmltopdf';
  @ViewChild('pdfTable') pdfTable: ElementRef;

  dataSource: ReportDataSource;
  exportList: any[] = [];
  exportHeader: any[] = [
  "Landlord Name",
  "Lease",
  "Tenant Name",
  "Tenants Phone",
  "Tenants Email",
  "Property Name",
  "Property Type",
  "Unit Name",
  "Location",
  "Unit Type",
  "Floor Number",
  "Rent Amount"];

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

    this.dataSource.reportLoad('/custom-reports/details-tenant-summary');
    this.dataSource.meta$.subscribe((res) => {
      if (Object.getOwnPropertyNames(res).length !== 0) {
        this.exportList = res['reports'];
        this.allDataList = res['reports'];

        this.displayedColumns = res['headers'];
        this.dataSource1 = new MatTableDataSource<any>(res['reports']);;
      }
    });
  }

  async exportReport() {
    this.dataSource.reportLoad('/custom-reports/details-tenant-summary')

    this.dataSource.meta$.subscribe((res) => {
      if (Object.getOwnPropertyNames(res).length !== 0) {
        // this.exportHeader = res['headers'];
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
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public downloadAsPDF() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    var docDefinition = {
      pageSize: {
        width: 891,
        height: 630
      },
      pageOrientation: 'landscape',
      pageMargins: [0, 0, 0, 0],
      content: html
    };
    pdfMake.createPdf(docDefinition).open();
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


}
