import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeReportReportComponent } from './notice-report-report.component';

describe('NoticeReportReportComponent', () => {
  let component: NoticeReportReportComponent;
  let fixture: ComponentFixture<NoticeReportReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeReportReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeReportReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
