import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  
  export class WelcomeGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
  
      const ctx = context.switchToHttp();

      const res: Response = ctx.getResponse<Response>();
  
      if (!!res.body) {
        return true;
      } else {
        // throw new BadRequestException("Invalid user");
        return false;
      }
    }
  }