import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { UsersService } from './users.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PersonLoginRequest } from '../models/Request/PersonLoginRequest';
import { PersonLoginResponse } from '../models/Response/PersonLoginResponse';
import { Role } from '../models/Role';
import { PersonRequest } from '../models/Request/PersonRequest';

describe('UsersService', () => {
  let usersService: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService, DataService],
    });

    usersService = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loginUser', () => {
    it('should return a PersonLoginResponse', () => {
      const mockLoginRequest: PersonLoginRequest = {
        email: 'test@test.com',
        password: 'Test1',
      };

      const mockLoginResponse: PersonLoginResponse = {
        success: true,
        message: 'Login successful',
        data: {
          token: 'token',
          email: 'test@test.com',
          roles: [new Role(4, 'dev')],
        },
      };

      usersService.loginUser(mockLoginRequest).subscribe((response) => {
        expect(response).toEqual(mockLoginResponse);
      });

      const req = httpMock.expectOne('http://localhost:8080/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockLoginResponse);
    });
  });

  describe('registerUser', () => {
    it('should return a PersonResponse', () => {
      const mockUser: PersonRequest = {
        name: 'Test User',
        email: 'test@test.com',
        password: 'test',
        lastname: 'Test',
        cuil: 'test',
        tel: 'Test',
        hours_journal: 8,
      };

      usersService.registerUser(mockUser).subscribe((response) => {
        expect(response).toEqual();
      });

      const req = httpMock.expectOne('http://localhost:8080/person');
      expect(req.request.method).toBe('POST');
    });
  });
});
