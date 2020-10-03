import { TestBed } from '@angular/core/testing';

import { TrasformaService } from './trasforma.service';

describe('TrasformaService', () => {
  let service: TrasformaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrasformaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
