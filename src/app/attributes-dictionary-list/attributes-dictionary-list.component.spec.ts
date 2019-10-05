import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributesDictionaryListComponent } from './attributes-dictionary-list.component';

describe('AttributesDictionaryListComponent', () => {
  let component: AttributesDictionaryListComponent;
  let fixture: ComponentFixture<AttributesDictionaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributesDictionaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributesDictionaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
