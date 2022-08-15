import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceChargeReportComponent } from './service-charge-report.component';

describe('ServiceChargeReportComponent', () => {
  let component: ServiceChargeReportComponent;
  let fixture: ComponentFixture<ServiceChargeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceChargeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceChargeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
