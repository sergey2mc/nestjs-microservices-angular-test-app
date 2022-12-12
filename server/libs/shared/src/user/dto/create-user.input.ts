import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateUserInput {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @IsNotEmpty()
  birthCountry: string;

  @IsNotEmpty()
  language: string;

  @IsNotEmpty()
  telephone: string;
}
