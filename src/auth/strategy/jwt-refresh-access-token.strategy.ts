import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import parse from 'parse-duration';

import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtRefreshAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-access-token') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Refresh;
      }]),
      secretOrKey: `${parse(configService.get('JWT_REFRESH_TOKEN_SECRET'))}`,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshToken = request.cookies?.Refresh;
    return await this.authService.verifyRefreshToken(payload.email, refreshToken);
  }
}