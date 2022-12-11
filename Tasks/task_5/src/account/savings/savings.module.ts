import { Module } from '@nestjs/common';

@Module({})
export class SavingsModule {
  constructor() {
    console.log(`This is savings account module`);
  }
}
