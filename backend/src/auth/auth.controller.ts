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
    ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    LocalAuthGuard,
    JwtAuthGuard,
    RefreshAuthGuard,
} from 'src/common/guards';
import { CreateUserDto, UpdatePasswordDto } from './dtos';
import { User } from '../common/entities';
import { CurrentUser } from 'src/common/decorators';
import { COOKIE_OPTIONS } from 'src/common/constants';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() dto: CreateUserDto): Promise<User> {
        const { email, username } = dto;
        const emailTaken = await this.authService.emailTaken(email);
        if (emailTaken) {
            throw new ConflictException('Email is already in use');
        }
        const usernameTaken = await this.authService.usernameTaken(username);
        if (usernameTaken) {
            throw new ConflictException('Username is already in use');
        }
        return this.authService.register(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req, @CurrentUser() user: User): Promise<User> {
        const { accessToken, refreshToken } = await this.authService.login(
            user,
        );
        req.res.cookie('access-token', accessToken, COOKIE_OPTIONS);
        req.res.cookie('refresh-token', refreshToken, COOKIE_OPTIONS);

        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout(@Request() req, @CurrentUser() user: User): Promise<void> {
        await this.authService.logout(user.uid);
        req.res.clearCookie('access-token');
        req.res.clearCookie('refresh-token');
    }

    @UseGuards(JwtAuthGuard)
    @Put('/password')
    async updatePassword(
        @Body() dto: UpdatePasswordDto,
        @CurrentUser() user: User,
    ): Promise<User> {
        const { uid, username } = user;
        return this.authService.updatePassword(uid, username, dto);
    }

    @UseGuards(RefreshAuthGuard)
    @Get('/refresh')
    async refreshAccessToken(
        @Request() req,
        @CurrentUser() user: User,
    ): Promise<{ accessToken: string }> {
        const { uid } = user;
        const accessToken = await this.authService.refreshAccessToken(uid);

        req.res.cookie('access-token', accessToken, COOKIE_OPTIONS);
        return { accessToken };
    }
}
