import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetUserByEmail {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
