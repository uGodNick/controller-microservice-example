import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import { User } from 'src/types/user';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async login(dto: LoginUserDto): Promise<string> {
    const user = await this.validate(dto);

    return await this.jwtService.signAsync({ user }, { secret: process.env.JWT_SECRET_KEY });
  }

  async validate(dto: LoginUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(dto.email);

    const isCorrectPassword = await compare(dto.password, user.passwordHash);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    return user;
  }
}
