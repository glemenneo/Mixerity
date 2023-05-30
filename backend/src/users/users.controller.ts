import {
    Controller,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Get,
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
import { JwtAuthGuard } from '../common/guards';
import { User } from './entities';
import { UpdateUserDto } from './dtos';
import { PaginationRequestDto } from '../common/pagination';

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(@Body() dto: PaginationRequestDto): Promise<[User[], number]> {
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
    async deleteUser(@Param('uid') uid: string, @Request() req): Promise<User> {
        const user = await this.usersService.getOneByUid(uid);
        if (!user) {
            throw new NotFoundException('No such user found');
        }
        if (req.user.uid != uid) {
            throw new ForbiddenException('Not allowed to delete user');
        }

        return this.usersService.delete(req.user.uid);
    }
}
