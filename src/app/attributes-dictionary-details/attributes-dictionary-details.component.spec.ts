import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesDictionaryDetailsComponent } from './attributes-dictionary-details.component';

describe('AttributesDictionaryDetailsComponent', () => {
  let component: AttributesDictionaryDetailsComponent;
  let fixture: ComponentFixture<AttributesDictionaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributesDictionaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesDictionaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
