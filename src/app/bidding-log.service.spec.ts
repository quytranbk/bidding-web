import { TestBed } from '@angular/core/testing';

import { BiddingLogService } from './bidding-log.service';

describe('BiddingLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BiddingLogService = TestBed.get(BiddingLogService);
    expect(service).toBeTruthy();
  });
});
