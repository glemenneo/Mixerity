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
import { CreateUserDto } from './dtos/create-user.dto';

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
    login() {}

    @Post('/logout')
    logout() {}
}
