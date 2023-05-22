import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

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

    validate(
        req: Request,
        payload: { sub: number; email: string },
    ): Promise<User> {
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
