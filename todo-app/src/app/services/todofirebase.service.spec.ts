import { TestBed } from '@angular/core/testing';

import { TodofirebaseService } from './todofirebase.service';

describe('TodofirebaseService', () => {
  let service: TodofirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodofirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
