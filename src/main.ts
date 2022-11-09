import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  /*const httpsOptions = {
    key: fs.readFileSync(
      join(__dirname, '..', '..', '..', 'ssl', 'ssl.key')
    ),
    cert: fs.readFileSync(
      join(__dirname, '..', '..', '..', 'ssl', 'ssl.crt')
    )
  };*/

  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const config = new DocumentBuilder()
    .setTitle('Vedom')
    .setDescription('VedomAPI')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'api',
        description: 'Enter JWT token',
        in: 'header'
      },
      'auth'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
  app.enableCors();
  await app.init();

  http.createServer(server).listen(80);
  //https.createServer(httpsOptions, server).listen(443);
}
bootstrap();
