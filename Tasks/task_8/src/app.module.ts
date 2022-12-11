import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  providers: [],
  controllers: [AppController],
  imports: [],
  exports: []
})
export class AppModule {}
