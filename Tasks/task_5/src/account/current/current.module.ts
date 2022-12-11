import { Module } from '@nestjs/common';

@Module({})
export class CurrentModule {
  constructor() {
    console.log(`This is current account module`);
  }
}
