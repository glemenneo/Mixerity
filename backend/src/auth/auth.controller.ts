import {
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor,
    Post,
    Body,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    register(@Body() body: any): Promise<User> {
        const { email, username, password } = body;
        return this.authService.register(email, username, password);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login() {}

    @Post('/logout')
    logout() {}
}
