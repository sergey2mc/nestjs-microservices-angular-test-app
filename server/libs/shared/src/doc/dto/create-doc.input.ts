import { IsNotEmpty } from 'class-validator';

export class CreateDocInput {
  @IsNotEmpty()
  title: string;

  // Todo: add validation for user existing
  @IsNotEmpty()
  userId: string;
}
