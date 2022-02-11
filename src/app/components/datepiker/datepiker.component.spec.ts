import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepikerComponent } from './datepiker.component';

describe('DatepikerComponent', () => {
  let component: DatepikerComponent;
  let fixture: ComponentFixture<DatepikerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatepikerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
