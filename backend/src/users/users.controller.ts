import {
    Controller,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Get,
    Put,
    Delete,
    Param,
    Query,
    Body,
    BadRequestException,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos';
import { UsersService } from './users.service';
import { CurrentUser } from '../common/decorators';
import { User } from '../common/entities';
import { JwtAuthGuard } from '../common/guards';
import { PaginationRequestDto } from '../common/pagination';

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(@Query() dto: PaginationRequestDto): Promise<[User[], number]> {
        return this.usersService.paginate(dto);
    }

    @Get('/:uid')
    async getOneUser(@Param('uid') uid: string): Promise<User> {
        const user = await this.usersService.getOneByUid(uid);
        if (!user) {
            throw new NotFoundException('No such user found');
        }
        return user;
    }

    @Put('/:uid')
    async updateUser(
        @Param('uid') uid: string,
        @Body() dto: UpdateUserDto,
        @CurrentUser() user: User,
    ): Promise<User> {
        if (user.uid !== uid) {
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
    async deleteUser(
        @Param('uid') uid: string,
        @CurrentUser() user: User,
    ): Promise<User> {
        const userToDelete = await this.usersService.getOneByUid(uid);
        if (!userToDelete) {
            throw new NotFoundException('No such user found');
        }
        if (user.uid != uid) {
            throw new ForbiddenException('Not allowed to delete user');
        }

        return this.usersService.delete(uid);
    }
}
