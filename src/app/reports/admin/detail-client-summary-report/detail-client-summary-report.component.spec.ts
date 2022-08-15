import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClientSummaryReportComponent } from './detail-client-summary-report.component';

describe('DetailClientSummaryReportComponent', () => {
  let component: DetailClientSummaryReportComponent;
  let fixture: ComponentFixture<DetailClientSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailClientSummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailClientSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
