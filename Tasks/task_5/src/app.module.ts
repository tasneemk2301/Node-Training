import { Module } from '@nestjs/common';
import { LoanModule } from './loan/loan.module';
import { AccountModule } from './account/account.module';

@Module({
  // providers: [],
  // controllers: [],
  // exports: [],
  imports: [AccountModule, LoanModule],
})
export class AppModule {
  constructor() {
    console.log(`This is app module`);
  }
}
