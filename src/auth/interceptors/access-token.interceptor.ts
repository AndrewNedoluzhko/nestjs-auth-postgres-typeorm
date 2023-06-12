import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import parse from 'parse-duration';

import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';

//this interceptor set auhtentication token 
@Injectable()
export class AccessTokenInterceptor implements NestInterceptor {
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
        const accessTokenExpiresIn = parse(this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'));
        const accessTokenSecret = `${this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET')}`;
        const accessTokenOptions = { expiresIn: `${accessTokenExpiresIn}`, secret: accessTokenSecret };
        const accessToken = this.authService.signToken(user, accessTokenOptions);

        response.cookie("Authentication", accessToken, {
          httpOnly: true,
          maxAge: accessTokenExpiresIn
        });
        return user;
      })
    )
  }
}
