import {
    IsString,
    IsEmail,
    Validate
} from 'class-validator';
import { CustomChar } from './CustomChar';


export class User {

    @IsString()
    @Validate(CustomChar, {
        message: 'Username cannot contain numbers or special characters.'
      })
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

  }