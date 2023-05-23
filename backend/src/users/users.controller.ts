import {
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards,
    Get,
    Request,
    Body,
    Put,
    BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards';
import { User } from './entities';
import { UpdateUserDto } from './dtos';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/self')
    getCurrentUser(@Request() req): Promise<User> {
        return this.usersService.findOneByUid(req.user.uid);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/edit')
    async editUser(@Request() req, @Body() dto: UpdateUserDto): Promise<User> {
        const { email, username } = dto;
        const emailExists = await this.usersService.findOneByEmail(email);
        if (emailExists) {
            throw new BadRequestException('Email is already in use!');
        }

        const usernameExists = await this.usersService.findOneByUsername(
            username,
        );
        if (usernameExists) {
            throw new BadRequestException('Username is already in use!');
        }

        return this.usersService.update(req.user.uid, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/delete')
    deleteUser(@Request() req): Promise<User> {
        return this.usersService.delete(req.user.uid);
    }
}
