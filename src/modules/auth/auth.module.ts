import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppModule } from 'src/app.module';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => AppModule),
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [AuthService, JwtService]
})
export class AuthModule {}
