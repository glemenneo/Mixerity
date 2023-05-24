import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/index';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: JwtRefreshStrategy.extractRefreshTokenFromCookies,
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: { sub: string }): Promise<User> {
        const { sub: uid } = payload;
        const refreshToken =
            JwtRefreshStrategy.extractRefreshTokenFromCookies(req);

        return this.authService.validateRefreshToken(uid, refreshToken);
    }

    private static extractRefreshTokenFromCookies(req: Request): string | null {
        if (req.cookies && req.cookies['refresh-token']) {
            return req.cookies['refresh-token'];
        }

        return null;
    }
}
