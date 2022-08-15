import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTenantReportComponent } from './detail-tenant-report.component';

describe('DetailTenantReportComponent', () => {
  let component: DetailTenantReportComponent;
  let fixture: ComponentFixture<DetailTenantReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTenantReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTenantReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
