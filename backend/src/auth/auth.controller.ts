import {
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor,
    Post,
    Body,
    UseGuards,
    Request,
    Put,
    Get,
    BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    LocalAuthGuard,
    JwtAuthGuard,
    RefreshAuthGuard,
} from 'src/common/guards';
import { CreateUserDto, UpdatePasswordDto } from './dtos';
import { User } from 'src/users/entities';
import { COOKIE_OPTIONS } from 'src/common/constants/constants';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() dto: CreateUserDto): Promise<User> {
        const { email, username, password } = dto;
        const emailExists = await this.authService.emailExists(email);
        if (emailExists) {
            throw new BadRequestException(
                'An account with this email already exists!',
            );
        }
        const usernameExists = await this.authService.usernameExists(username);
        if (usernameExists) {
            throw new BadRequestException(
                'An account with this username already exists!',
            );
        }
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

    @UseGuards(JwtAuthGuard)
    @Put('/password')
    async updatePassword(
        @Request() req,
        @Body() dto: UpdatePasswordDto,
    ): Promise<User> {
        const { uid } = req.user;
        const { password } = dto;
        return this.authService.updatePassword(uid, password);
    }

    @UseGuards(RefreshAuthGuard)
    @Get('/refresh')
    async refreshAccessToken(@Request() req): Promise<User> {
        const { uid } = req.user;
        const accessToken = await this.authService.refreshAccessToken(uid);

        req.res.cookie('access-token', accessToken, COOKIE_OPTIONS);
        return req.user;
    }
}
