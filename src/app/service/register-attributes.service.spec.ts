import { TestBed } from '@angular/core/testing';

import { RegisterAttributesService } from './register-attributes.service';

describe('RegisterAttributesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterAttributesService = TestBed.get(RegisterAttributesService);
    expect(service).toBeTruthy();
  });
});
