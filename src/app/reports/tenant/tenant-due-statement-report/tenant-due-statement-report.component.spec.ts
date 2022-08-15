import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDueStatementReportComponent } from './tenant-due-statement-report.component';

describe('TenantDueStatementReportComponent', () => {
  let component: TenantDueStatementReportComponent;
  let fixture: ComponentFixture<TenantDueStatementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantDueStatementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantDueStatementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
