import { IsNotEmpty, IsString } from "class-validator";

export class Thought {

    sno: number;

    @IsString()
    @IsNotEmpty()
    owner: string;

    @IsString()
    @IsNotEmpty()
    thought: string;
  }