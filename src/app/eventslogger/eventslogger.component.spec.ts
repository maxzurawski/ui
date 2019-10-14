import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsloggerComponent } from './eventslogger.component';

describe('EventsloggerComponent', () => {
  let component: EventsloggerComponent;
  let fixture: ComponentFixture<EventsloggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsloggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsloggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
