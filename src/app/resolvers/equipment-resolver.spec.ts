import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { equipmentResolver } from './equipment-resolver';

describe('equipmentResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => equipmentResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
