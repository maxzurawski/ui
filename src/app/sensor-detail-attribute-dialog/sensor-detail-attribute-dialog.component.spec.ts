import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDetailAttributeDialogComponent } from './sensor-detail-attribute-dialog.component';

describe('SensorDetailAttributeDialogComponent', () => {
  let component: SensorDetailAttributeDialogComponent;
  let fixture: ComponentFixture<SensorDetailAttributeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorDetailAttributeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDetailAttributeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
