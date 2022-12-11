import { Module } from '@nestjs/common';
import { SavingsModule } from './savings/savings.module';
import { CurrentModule } from './current/current.module';

@Module({
  imports: [CurrentModule, SavingsModule],
})
export class AccountModule {
  constructor() {
    console.log(`This is account module`);
  }
}
