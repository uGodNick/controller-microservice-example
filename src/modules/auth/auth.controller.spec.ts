import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

class ApiServiceMock {
  login() {}
}

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeAll(async () => {
    const ApiServiceProvider: Provider = {
      provide: AuthService,
      useClass: ApiServiceMock
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, ApiServiceProvider]
    }).compile();

    controller = app.get<AuthController>(AuthController);
    service = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling login method', async () => {
    const loginSpy = jest.spyOn(service, 'login');
    const dto: LoginUserDto = {
      email: '',
      password: ''
    };
    await controller.login(dto);

    expect(loginSpy).toHaveBeenCalledWith(dto);
  });
});
