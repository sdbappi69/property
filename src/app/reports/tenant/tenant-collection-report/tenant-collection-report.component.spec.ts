import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantCollectionReportComponent } from './tenant-collection-report.component';

describe('TenantCollectionReportComponent', () => {
  let component: TenantCollectionReportComponent;
  let fixture: ComponentFixture<TenantCollectionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantCollectionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantCollectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
