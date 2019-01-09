import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeHomeComponent } from './size-home.component';

describe('SizeHomeComponent', () => {
  let component: SizeHomeComponent;
  let fixture: ComponentFixture<SizeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
