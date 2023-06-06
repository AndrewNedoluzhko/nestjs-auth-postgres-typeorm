import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  @UseInterceptors(TokenInterceptor)
  async register(@Body() createUserDto: CreateUserDto){
    console.log(`AuthController.register before AuthService.register`);
    return await this.authService.register(createUserDto)
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  async login(
    @CurrentUser() user: User
  ){
    return user;
  }
 /*
  refreshToken(){

  }

  profile(){

  }

  logout(){

  }
 */
}
