import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService
  ) { }

  async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (await user.veryfyPassword(password)) {
      delete user.password;
      delete user.refreshToken;
      return user;
    } else {
      throw new UnauthorizedException('Password missmatched')
    }
  }

  signToken(user: User, options: any) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload, options);
  }

  async verify(email: string): Promise<User> {
    if (!email) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    delete user.password;
    delete user.refreshToken;
    return user;
  }

  async verifyRefreshToken(email: string, refreshToken: string): Promise<User> {
    if (!email) {
      throw new UnauthorizedException();
    }
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token expired!");
    }
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    if (await user.verifyRefreshToken(refreshToken)) {
      delete user.password;
      delete user.refreshToken;
      return user;
    } else {
      throw new UnauthorizedException('Refresh Token mismatched')
    }
  }

  async setCurrentRefreshToken(id: number, refreshToken: string) {
    await this.usersService.setCurrentRefreshToken(id, refreshToken);
  }

  async removeCurrentRefreshToken(id: number) {
    await this.usersService.removeCurrentRefreshToken(id);
  }
}
