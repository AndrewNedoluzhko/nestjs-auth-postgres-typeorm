import { Strategy } from "passport-local";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { AuthService } from "../auth.service";
import { User } from "src/users/entities/user.entity";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  validate(email: string, password: string): Promise<User> {
    return this.authService.login(email, password);
  }
}