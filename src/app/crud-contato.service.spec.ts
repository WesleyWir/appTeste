import { TestBed } from '@angular/core/testing';

import { CrudContatoService } from './crud-contato.service';

describe('CrudContatoService', () => {
  let service: CrudContatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudContatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
