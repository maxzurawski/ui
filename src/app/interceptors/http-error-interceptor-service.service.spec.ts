import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptorServiceService } from './http-error-interceptor-service.service';

describe('HttpErrorInterceptorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpErrorInterceptorServiceService = TestBed.get(HttpErrorInterceptorServiceService);
    expect(service).toBeTruthy();
  });
});
