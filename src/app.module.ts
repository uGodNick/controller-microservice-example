import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '.env')
    }),
    ClientsModule.register([
      {
        name: 'DB_MICROSERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 54321 }
      }
    ]),
    UserModule,
    AuthModule
  ],
  exports: [ClientsModule]
})
export class AppModule {}
