import { TestBed } from '@angular/core/testing';

import { EventsloggerService } from './eventslogger.service';

describe('EventsloggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsloggerService = TestBed.get(EventsloggerService);
    expect(service).toBeTruthy();
  });
});
