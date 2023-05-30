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
import { COOKIE_OPTIONS } from 'src/common/constants';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() dto: CreateUserDto): Promise<User> {
        const { email, username, password } = dto;
        const emailTaken = await this.authService.emailTaken(email);
        if (emailTaken) {
            throw new BadRequestException('Email is already in use');
        }
        const usernameTaken = await this.authService.usernameTaken(username);
        if (usernameTaken) {
            throw new BadRequestException('Username is already in use');
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
