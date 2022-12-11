import {
    IsString,
    IsEmail,
    Validate
} from 'class-validator';
import { CustomChar } from './CustomChar';


export class validUser {

    @IsString()
    @Validate(CustomChar, {
        message: 'Username cannot contain numbers or special characters.'
      })
    username: string;

    @IsString()
    password: string;

  }