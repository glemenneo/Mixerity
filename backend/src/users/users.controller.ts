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
    getAll(@Param('uid') uid: number): Promise<User[]> {
        return this.usersService.find({});
    }

    @Get('/get/:uid')
    async getOne(@Param('uid') uid: number): Promise<User> {
        const user = await this.usersService.findOneByUid(uid);
        if (!user) {
            throw new NotFoundException('No such user found.');
        }
        return user;
    }

    @Post('/search')
    searchUser(@Body() dto: SearchUserDto): Promise<User[]> {
        return this.usersService.find(dto);
    }

    @Put('/:uid')
    async updateUser(
        @Param('uid') uid: number,
        @Request() req,
        @Body() dto: UpdateUserDto,
    ): Promise<User> {
        if (req.user.uid != uid) {
            throw new ForbiddenException('Not allowed to update user.');
        }
        if (Object.entries(dto).length === 0) {
            throw new BadRequestException('Empty request');
        }
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

    @Delete('/:uid')
    deleteUser(@Param('uid') uid: number, @Request() req): Promise<User> {
        if (req.user.uid != uid) {
            throw new ForbiddenException('Not allowed to delete user.');
        }

        return this.usersService.delete(req.user.uid);
    }
}
