import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppModule } from 'src/app.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AppModule), forwardRef(() => AuthModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
