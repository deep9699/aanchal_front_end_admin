import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrderStatusComponent } from './supplier-order-status.component';

describe('SupplierOrderStatusComponent', () => {
  let component: SupplierOrderStatusComponent;
  let fixture: ComponentFixture<SupplierOrderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierOrderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
