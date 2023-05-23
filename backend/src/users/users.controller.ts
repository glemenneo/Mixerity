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
    Param,
    NotFoundException,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/common/guards';
import { User } from './entities';
import { SearchUserDto, UpdateUserDto } from './dtos';

@Controller('users')
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

    @UseGuards(JwtAuthGuard)
    @Put('/update')
    async updateUser(
        @Request() req,
        @Body() dto: UpdateUserDto,
    ): Promise<User> {
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
