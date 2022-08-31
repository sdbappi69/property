import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'app/reports/report.service';
import { ReportDataSource } from '../../report-data.source';
import * as FileSaver from 'file-saver';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-collection-report',
  templateUrl: './collection-report.component.html',
  styleUrls: ['./collection-report.component.scss']
})

export class CollectionReportComponent implements AfterViewInit {
  dataSource: ReportDataSource;
  exportList: any[] = [];
  exportHeader: any[] = [];
  TableListData: any[] = [];

  displayedColumns: string[] = [];
  dataSource1 = new MatTableDataSource<any>();

  constructor(private reportService: ReportService) { }
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
        this.displayedColumns = res['headers'];
        this.dataSource1 = new MatTableDataSource<any>(res['reports']);;
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

}


