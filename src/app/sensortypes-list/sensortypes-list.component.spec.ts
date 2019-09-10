import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensortypesListComponent } from './sensortypes-list.component';

describe('SensortypesListComponent', () => {
  let component: SensortypesListComponent;
  let fixture: ComponentFixture<SensortypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensortypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensortypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
