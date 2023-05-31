import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../common/entities';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'username', passwordField: 'password' });
    }

    validate(username: string, password: string): Promise<Partial<User>> {
        return this.authService.validateUser(username, password);
    }
}
