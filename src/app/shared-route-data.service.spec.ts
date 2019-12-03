import { TestBed } from '@angular/core/testing';

import { SharedRouteDataService } from './shared-route-data.service';

describe('SharedRouteDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedRouteDataService = TestBed.get(SharedRouteDataService);
    expect(service).toBeTruthy();
  });
});
