import {
    Controller,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Request,
    Body,
    BadRequestException,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards';
import { User } from './entities';
import { SearchUserDto, UpdateUserDto } from './dtos';

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/all')
    getAll(): Promise<User[]> {
        return this.usersService.find({});
    }

    @Get('/get/:uid')
    async getOne(@Param('uid') uid: number): Promise<User> {
        const user = await this.usersService.findOneByUid(uid);
        if (!user) {
            throw new NotFoundException('No such user found');
        }
        return user;
    }

    @Post('/search')
    searchUsers(@Body() dto: SearchUserDto): Promise<User[]> {
        return this.usersService.find(dto);
    }

    @Put('/:uid')
    async updateUser(
        @Param('uid') uid: number,
        @Request() req,
        @Body() dto: UpdateUserDto,
    ): Promise<User> {
        if (req.user.uid !== uid) {
            throw new ForbiddenException('Not allowed to update user');
        }
        if (Object.entries(dto).length === 0) {
            throw new BadRequestException('Empty request');
        }
        const { email, username } = dto;
        const emailTaken = await this.usersService.emailTaken(email);
        if (emailTaken) {
            throw new BadRequestException('Email is already in use');
        }
        const usenameTaken = await this.usersService.usernameTaken(username);
        if (usenameTaken) {
            throw new BadRequestException('Username is already in use');
        }

        return this.usersService.update(uid, dto);
    }

    @Delete('/:uid')
    async deleteUser(@Param('uid') uid: number, @Request() req): Promise<User> {
        const user = await this.usersService.findOneByUid(uid);
        if (!user) {
            throw new NotFoundException('No such user found');
        }
        if (req.user.uid != uid) {
            throw new ForbiddenException('Not allowed to delete user');
        }

        return this.usersService.delete(req.user.uid);
    }
}
