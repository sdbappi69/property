import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeReportComponent } from './notice-report.component';

describe('NoticeReportComponent', () => {
  let component: NoticeReportComponent;
  let fixture: ComponentFixture<NoticeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
