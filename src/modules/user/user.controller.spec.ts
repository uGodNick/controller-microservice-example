import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByEmail } from './dto/get-user-by-email.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const userId = 0;
const email = '';
class ApiServiceMock {
  getUserByEmail() {}
  createUser() {}
}

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    const ApiServiceProvider: Provider = {
      provide: UserService,
      useClass: ApiServiceMock
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ApiServiceProvider]
    }).compile();

    controller = app.get<UserController>(UserController);
    service = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling getUserByEmail method', async () => {
    const getUserByEmailSpy = jest.spyOn(service, 'getUserByEmail');
    const dto: GetUserByEmail = {
      email
    };
    await controller.getUserByEmail(dto);

    expect(getUserByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('calling createUser method', async () => {
    const createUserSpy = jest.spyOn(service, 'createUser');
    const dto: CreateUserDto = {
      name: 'Test',
      email: 'test@email.com',
      passwordHash: '',
      password: 'pass'
    };
    await controller.createUser(dto);

    expect(createUserSpy).toHaveBeenCalledWith(dto);
  });
});
