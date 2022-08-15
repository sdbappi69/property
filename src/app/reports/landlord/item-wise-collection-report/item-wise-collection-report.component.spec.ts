import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseCollectionReportComponent } from './item-wise-collection-report.component';

describe('ItemWiseCollectionReportComponent', () => {
  let component: ItemWiseCollectionReportComponent;
  let fixture: ComponentFixture<ItemWiseCollectionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemWiseCollectionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWiseCollectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
