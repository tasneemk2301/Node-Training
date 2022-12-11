import { Module } from '@nestjs/common';

@Module({})
export class LoanModule {
  constructor() {
    console.log(`This is loan module`);
  }
}
