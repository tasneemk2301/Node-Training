import { Controller, Get, Post, Body, Res, Param, Render, ValidationPipe, UseFilters, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { Response} from 'express';
import {User} from  './user.dto';
import {validUser} from './validUser.dto';
import {UserExceptionFilter} from './user.exception-filter';
import {Thought} from './thought.dto';
import { WelcomeGuard } from './welcome.guard';



@Controller()
export class AppController {
  thoughts: Thought[]= [];
  users: User[]= [];
  constructor() {
    this.thoughts.push({sno:1123, owner:"Mukesh", thought:"Want to see snow"});
    this.thoughts.push({sno:7364, owner:"Ramesh", thought:"Want to see snow"});
    this.thoughts.push({sno:4351, owner:"Suresh", thought:"Purchasing bike"});
    this.thoughts.push({sno:3200, owner:"Mahesh", thought:"Watching Avengers"});

    this.users.push({username:"admin", email:"admin@gmail.com", password:"admin"});
  }

  @Get('signup')
  signupForm(@Res() res:Response) {
    res.render('signup', {errorMessage: ""} );
  }

  @Post('signup')
  signup(@Body(new ValidationPipe()) user:User , @Res() res:Response): User {
    console.log(user);
    if(!!user.username && !!user.email && !!user.password) {
      console.log('Saving user details: ' + JSON.stringify(user));
      this.users.push(user);
      res.render('welcome', {results:this.thoughts, errorMessage: ""});
      return user;
    }
    else {
      console.log("Sign Up failed.")
      res.render('signup', {errorMessage: "All fields must be filled"});
  }
  }

  /*
  @Post ('signup')
  saveUser(@Body(new ValidationPipe()) user: User): User {
    console.log('Saving user details: ' + JSON.stringify(user));
    this.users.push(user);
    return user;
  }
  */

  @Get('login')
  signinForm(@Res() res:Response) {
    res.render('login', {errorMessage: ""} );
  }

  @Post('login')
  @UseFilters(new UserExceptionFilter())
  signin(@Body(new ValidationPipe()) user:validUser , @Res() res:Response): validUser {
    console.log(user);
    if(!!user.username && !!user.password) {
      for(var i=0; i<this.users.length; i++)
      {
        if(this.users[i].username===user.username )
        {
          if(this.users[i].password===user.password)
          {
            res.render('welcome',  {results:this.thoughts, errorMessage: ""});
            return user;
          }
          else {
            res.render('login', {errorMessage: "Incorrect Password. Try Again."});
            return user;
          }
          
        }
      }
      throw new HttpException(
        'Credentials do not exist.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

      
      
    }
    else {
      res.render('login', {errorMessage: "All fields must be filled"});
  }
  }

  @Get('welcome')
  @UseGuards(WelcomeGuard)
  welcome(@Res() res:Response) {
    res.render('welcome', {results:this.thoughts, errorMessage: ""});
  }
  @Post('welcome')
  saveThought(@Body(new ValidationPipe()) thought:Thought,  @Res() res:Response) {
    thought.sno=Math.floor((Math.floor((Math.random() * 10)*100)/100)*1000);
    this.thoughts.push(thought);
    res.render('welcome', {results:this.thoughts, errorMessage: ""});
  }

}
