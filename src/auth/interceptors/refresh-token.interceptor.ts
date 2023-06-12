import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

import parse from 'parse-duration'
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';

//this interceptor set refresh token
@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler<User>): Observable<User> {
    return next.handle().pipe(
      map(user => {
        const response = context.switchToHttp().getResponse<Response>();
        const refreshTokenExpiresIn = parse(this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'));
        const refreshTokenSecret = `${parse(this.configService.get('JWT_REFRESH_TOKEN_SECRET'))}`;
        const refreshTokenOptions = { expiresIn: `${refreshTokenExpiresIn}`, secret: refreshTokenSecret };
        const refreshToken = this.authService.signToken(user, refreshTokenOptions);
        response.cookie("Refresh", refreshToken, {
          httpOnly: true,
          maxAge: refreshTokenExpiresIn
        });
        this.authService.setCurrentRefreshToken(user.id, refreshToken);
        return user;
      })
    )
  }
}
