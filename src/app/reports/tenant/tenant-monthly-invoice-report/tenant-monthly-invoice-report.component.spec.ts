import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantMonthlyInvoiceReportComponent } from './tenant-monthly-invoice-report.component';

describe('TenantMonthlyInvoiceReportComponent', () => {
  let component: TenantMonthlyInvoiceReportComponent;
  let fixture: ComponentFixture<TenantMonthlyInvoiceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantMonthlyInvoiceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantMonthlyInvoiceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
