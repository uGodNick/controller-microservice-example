import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

class ApiServiceMock {
  login() {}
  validate() {}
}

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthService,
          useClass: ApiServiceMock
        }
      ]
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('calling login method', async () => {
    const loginSpy = jest.spyOn(service, 'login');
    const dto: LoginUserDto = {
      email: '',
      password: ''
    };

    await service.login(dto);
    expect(loginSpy).toHaveBeenCalledWith(dto);
  });

  it('calling validate method', async () => {
    const validateSpy = jest.spyOn(service, 'validate');
    const dto: LoginUserDto = {
      email: '',
      password: ''
    };

    await service.validate(dto);
    expect(validateSpy).toHaveBeenCalledWith(dto);
  });
});
