import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    UseFilters,
  } from '@nestjs/common';
  
  interface Movie {
    id: number;
    title: string;
    rating: number;
    director: string;
  }
  
  @Controller('/api/v1/movies')
  export class MovieController {
    // movies:Array<Movie> = [];
    movies: Movie[] = [];
  
    constructor() {
      this.movies.push({ title: 'BlackWidow', id: 24, director: 'Alan', rating: 4.1 });
      this.movies.push({ title: 'Hulk', id: 41, director: 'Rogers', rating: 4.7 });
      this.movies.push({ title: 'She Hulk', id: 71, director: 'Eloise', rating: 3.7 });
      this.movies.push({ title: 'Hawkeye', id: 127, director: 'Trueman', rating: 4.4 });
    }
  
    @Get()
    getAllMovies(): Array<Movie> {
      return this.movies;
    }
    @Post()
    saveMovie(@Body() m: Movie): Movie {
      console.log(m);
      m.id=Math.floor((Math.random() * 10)*100)/100;
      this.movies.push(m);
      return m;
    }
    @Delete(':id')
    deleteMovie(@Param('id') id:number) {
        for(let i=0; i<this.movies.length; i++){
            if(this.movies[i].id===+id){
                this.movies.splice(i,1);
            }
        }
        console.log(this.movies)
    }
  }
  