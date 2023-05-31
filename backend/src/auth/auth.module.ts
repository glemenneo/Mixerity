import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy, JwtStrategy, LocalStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RedisModule } from '../common/redis';
import { UsersModule } from '../users';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({ useFactory: async () => ({}) }),
        RedisModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshStrategy,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                transform: true,
                whitelist: true,
            }),
        },
    ],
})
export class AuthModule {}
