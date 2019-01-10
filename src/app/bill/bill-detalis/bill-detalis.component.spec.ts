import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetalisComponent } from './bill-detalis.component';

describe('BillDetalisComponent', () => {
  let component: BillDetalisComponent;
  let fixture: ComponentFixture<BillDetalisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillDetalisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
