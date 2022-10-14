import { TestBed } from '@angular/core/testing';

import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtService;
  // tslint:disable-next-line:max-line-length
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjBiNjU5ZThmODZkNzRiZTRhMzU0MDBlMDA3ZTYxMWYyIiwicm9sZSI6Ikd1ZXN0IiwibmJmIjoxNTQ0Nzg2NTEwLCJleHAiOjE1NDQ3OTM3MTAsImlhdCI6MTU0NDc4NjUxMH0.FSewbTvr74KiH-1FepDhljuLzF4FnB56ersyrFnANhE';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new JwtService();
  });

  it('should be created', () => {
    service = TestBed.get(JwtService);
    expect(service).toBeTruthy();
  });

  it('test jwt parse', () => {
    const expectedJwt = JSON.parse(`{
      "unique_name": "0b659e8f86d74be4a35400e007e611f2",
      "role": "Guest",
      "nbf": 1544786510,
      "exp": 1544793710,
      "iat": 1544786510
    }`);
    const jwt = service.parseJwt(token);
    expect(jwt).toEqual(expectedJwt);
  });

  it('get date in right format from jwt token', () => {
    const jwt = service.parseJwt(token);
    const expDate = new Date(jwt.exp * 1000);

    expect(expDate.toISOString()).toBe('2018-12-14T13:21:50.000Z');
  });
});
