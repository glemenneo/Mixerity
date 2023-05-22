import {
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor,
    Post,
    Body,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { COOKIE_OPTIONS } from 'src/common/constants/constants';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    register(@Body() dto: CreateUserDto): Promise<User> {
        const { email, username, password } = dto;
        return this.authService.register(email, username, password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req): Promise<User> {
        const { accessToken, refreshToken } = await this.authService.login(
            req.user,
        );
        req.res.cookie('access-token', accessToken, COOKIE_OPTIONS);
        req.res.cookie('refresh-token', refreshToken, COOKIE_OPTIONS);

        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout(@Request() req): Promise<User> {
        const user = await this.authService.logout(req.user.uid);
        req.res.clearCookie('access-token');
        req.res.clearCookie('refresh-token');

        return user;
    }
}
