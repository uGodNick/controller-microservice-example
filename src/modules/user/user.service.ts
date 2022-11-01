import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { genSalt, hash } from 'bcryptjs';
import { MicroserviceResponse } from 'src/types/microservice-response';
import { User } from 'src/types/user';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject('DB_MICROSERVICE') private client: ClientProxy) {}

  async isUserExist(id: number): Promise<boolean> {
    const res = await new Promise<MicroserviceResponse<boolean>>((resolve) => {
      this.client.send('user-is-exist', id).subscribe((res) => resolve(res));
    });

    if (res.error) {
      throw new InternalServerErrorException(res.error);
    }

    return res.data;
  }

  async getUserById(id: number): Promise<User> {
    const res = await new Promise<MicroserviceResponse<User>>((resolve) => {
      this.client.send('user-get-by-id', id).subscribe((res) => resolve(res));
    });

    if (res.error) {
      throw new InternalServerErrorException(res.error);
    }

    return res.data;
  }

  async getUserByEmail(email: string): Promise<User> {
    const res = await new Promise<MicroserviceResponse<User>>((resolve) => {
      this.client.send('user-get-by-email', email).subscribe((res) => resolve(res));
    });

    if (res.error) {
      throw new InternalServerErrorException(res.error);
    }

    return res.data;
  }

  async createUser(dto: CreateUserDto): Promise<number> {
    const salt = await genSalt(10);
    const newUser: CreateUserDto = {
      ...dto,
      passwordHash: await hash(dto.password, salt)
    };
    const res = await new Promise<MicroserviceResponse<number>>((resolve) => {
      this.client.send('user-create', newUser).subscribe((res) => resolve(res));
    });

    if (res.error) {
      throw new InternalServerErrorException(res.error);
    }

    return res.data;
  }
}
