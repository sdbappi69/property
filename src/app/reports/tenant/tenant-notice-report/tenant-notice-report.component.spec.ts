import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantNoticeReportComponent } from './tenant-notice-report.component';

describe('TenantNoticeReportComponent', () => {
  let component: TenantNoticeReportComponent;
  let fixture: ComponentFixture<TenantNoticeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantNoticeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantNoticeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
