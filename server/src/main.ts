import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  // Enable validation pipe Globally because if you used the class validator in the dto without enable
  // pipe globally it will not work
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // whitelist true means if the user sends unneeded inputs in the request body, ignore them.
  await app.listen(4000);
}
bootstrap();
