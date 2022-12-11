import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname + '/../public'));
  app.setBaseViewsDir(join(__dirname + '/../views'));

  app.setViewEngine('ejs');

  await app.listen(port);

  console.log('My app is running at ' + port);

}
bootstrap();
