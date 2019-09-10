import { TestBed } from '@angular/core/testing';

import { SensorTypesService } from './sensor-types.service';

describe('SensorTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorTypesService = TestBed.get(SensorTypesService);
    expect(service).toBeTruthy();
  });
});
