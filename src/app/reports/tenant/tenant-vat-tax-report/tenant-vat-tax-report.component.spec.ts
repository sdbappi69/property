import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantVatTaxReportComponent } from './tenant-vat-tax-report.component';

describe('TenantVatTaxReportComponent', () => {
  let component: TenantVatTaxReportComponent;
  let fixture: ComponentFixture<TenantVatTaxReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantVatTaxReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantVatTaxReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
