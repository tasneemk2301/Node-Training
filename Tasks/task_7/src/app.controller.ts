import { Controller, Get, Post, Body, Res, Param, Render, ValidationPipe, UseFilters, HttpException, HttpStatus} from '@nestjs/common';
import { Response} from 'express';
import {User} from  './user.dto';
import {validUser} from './validUser.dto';
import {UserExceptionFilter} from './user.exception-filter';


interface Item {
  id: number;
  name: string;
  price: number;
}


@Controller()
export class AppController {
  items: Item[]= [];
  users: User[]= [];
  constructor() {
    this.items.push({id:1123, name:"purse", price:505});
    this.items.push({id:7364, name:"watch", price:1025});
    this.items.push({id:4351, name:"box", price:230});
    this.items.push({id:3200, name:"shirt", price:756});
    this.items.push({id:9123, name:"vacuum", price:2999});

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
      res.render('welcome', {results:this.items});
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
            res.render('welcome',  {results:this.items});
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
  welcome(@Res() res:Response) {
    res.render('welcome', {results:this.items} );
  }

}
