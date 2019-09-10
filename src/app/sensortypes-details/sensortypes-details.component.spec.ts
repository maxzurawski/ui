import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensortypesDetailsComponent } from './sensortypes-details.component';

describe('SensortypesDetailsComponent', () => {
  let component: SensortypesDetailsComponent;
  let fixture: ComponentFixture<SensortypesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensortypesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensortypesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
