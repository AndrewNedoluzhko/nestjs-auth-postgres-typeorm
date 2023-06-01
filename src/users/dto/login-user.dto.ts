import { Trim } from "class-sanitizer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto{
  
  @Trim()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}