import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorization = req.headers.authorization;

    const user = await this.jwtService.verifyAsync(authorization.slice(7), {
      secret: process.env.JWT_SECRET_KEY
    });

    return user;
  }
}
