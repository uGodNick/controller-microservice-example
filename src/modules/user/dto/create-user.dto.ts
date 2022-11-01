import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  @IsEmpty()
  readonly passwordHash?: string;
  @IsString()
  readonly imageUrl?: string;
}
