import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { LoginUserDto } from "./login-user.dto";

export class CreateUserDto extends LoginUserDto{

  @IsNotEmpty()
  @IsString()
  @Length(10, 14)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 14) 
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 14) 
  lastName: string;
 
  @IsNumber()
  roleId:number;

}
