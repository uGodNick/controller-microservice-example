import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../../types/user';
import { CreateUserDto } from './dto/create-user.dto';

const userId = 0;
const email = '';
const userTable: User = {
  id: userId,
  name: '',
  email,
  passwordHash: '',
  imageUrl: '',
  comments: [],
  favoriteChannels: []
};
class ApiServiceMock {
  isUserExist() {}
  getUserById() {}
  getUserByEmail() {}
  createUser() {}
}

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserService,
          useClass: ApiServiceMock
        }
      ]
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('calling isUserExist method', async () => {
    const isUserExistSpy = jest.spyOn(service, 'isUserExist');

    await service.isUserExist(userId);
    expect(isUserExistSpy).toHaveBeenCalledWith(userId);
  });

  it('calling getUserById method', async () => {
    const getUserByIdSpy = jest.spyOn(service, 'getUserById');
    await service.getUserById(userId);

    expect(getUserByIdSpy).toHaveBeenCalledWith(userId);
  });

  it('calling getUserByEmail method', async () => {
    const getUserByEmailSpy = jest.spyOn(service, 'getUserByEmail');
    await service.getUserByEmail(email);

    expect(getUserByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('calling createUser method', async () => {
    const createUserSpy = jest.spyOn(service, 'createUser');
    const dto: CreateUserDto = {
      name: '',
      email: '',
      passwordHash: '',
      password: ''
    };
    await service.createUser(dto);

    expect(createUserSpy).toHaveBeenCalledWith(dto);
  });
});
