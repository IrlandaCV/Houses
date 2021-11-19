import { ComponentFixture, TestBed } from '@angular/core/testing';

import { House1Component } from './house1.component';

describe('House1Component', () => {
  let component: House1Component;
  let fixture: ComponentFixture<House1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ House1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(House1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
