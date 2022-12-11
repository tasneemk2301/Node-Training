import { Module } from '@nestjs/common';
import { MovieController } from './movie/movie.controller';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [],
})
export class AppModule {

  constructor(){
    console.log("This is app module");
  }

}
