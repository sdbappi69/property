import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantServiceChargeReportComponent } from './tenant-service-charge-report.component';

describe('TenantServiceChargeReportComponent', () => {
  let component: TenantServiceChargeReportComponent;
  let fixture: ComponentFixture<TenantServiceChargeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantServiceChargeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantServiceChargeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
