import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { teacherConnectedGuard } from './teacher-connected.guard';

describe('teacherConnectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => teacherConnectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
