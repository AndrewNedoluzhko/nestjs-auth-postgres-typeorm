import { IsNotEmpty, IsNumber, IsString, Length, MaxLength } from "class-validator";
import { LoginUserDto } from "./login-user.dto";

export class CreateUserDto extends LoginUserDto{

  @IsNotEmpty()
  @IsString()
  @Length(10, 14)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(120) 
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(120) 
  lastname: string;
 
  @IsNumber()
  roleId:number;

}
