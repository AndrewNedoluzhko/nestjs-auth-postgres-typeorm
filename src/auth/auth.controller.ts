import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AccessTokenInterceptor } from './interceptors/access-token.interceptor';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { JwtRefreshAccessTokenGuard } from './guards/jwt-refresh-access-token.guard';
import { ClearCookiesInterceptor } from './interceptors/clear-cookies.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  @UseInterceptors(AccessTokenInterceptor, RefreshTokenInterceptor)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto)
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AccessTokenInterceptor, RefreshTokenInterceptor)
  async login(
    @CurrentUser() user: User
  ) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Post('refresh')
  @UseGuards( JwtRefreshAccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AccessTokenInterceptor)
  async refreshAccessToken(@CurrentUser() user: User) {
    return user;
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClearCookiesInterceptor)
  async logout(@CurrentUser() user: User) {
    if (user) {
      this.authService.removeCurrentRefreshToken(user.id);
    }
    console.log(`AuthController. logout`);
    return { succes: true };
  }
}
