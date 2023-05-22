import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'emailOrUsername', passwordField: 'password' });
    }

    validate(emailOrUsername: string, password: string): Promise<User> {
        return this.authService.validateUser(emailOrUsername, password);
    }
}
