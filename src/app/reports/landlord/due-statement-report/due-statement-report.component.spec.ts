import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueStatementReportComponent } from './due-statement-report.component';

describe('DueStatementReportComponent', () => {
  let component: DueStatementReportComponent;
  let fixture: ComponentFixture<DueStatementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueStatementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueStatementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
