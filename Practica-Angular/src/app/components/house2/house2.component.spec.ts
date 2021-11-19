import { ComponentFixture, TestBed } from '@angular/core/testing';

import { House2Component } from './house2.component';

describe('House2Component', () => {
  let component: House2Component;
  let fixture: ComponentFixture<House2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ House2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(House2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
