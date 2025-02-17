import { AuthService } from './auth.service.ts.service';
import { TestBed } from '@angular/core/testing';


describe('AuthServiceTsService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
