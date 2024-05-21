import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const serverConfig: { port: number } = config.get('server');
  const port: number = serverConfig.port;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
