import {
    Controller,
    UseGuards,
    Request,
    Get,
    Param,
    Put,
    Body,
    NotFoundException,
    Post,
    Delete,
    Query,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../common/guards';
import { Profile } from './entities';
import { UpdateProfileDto } from './dtos';
import { PaginationRequestDto } from '../common/pagination';
import { CurrentUser } from '../common/decorators';
import { User } from '../users/entities';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    async getProfiles(
        @Query() dto: PaginationRequestDto,
    ): Promise<[Profile[], number]> {
        return this.profileService.paginate(dto);
    }

    @Get('/:uid')
    async getOne(@Param('uid') uid: string): Promise<Profile> {
        const profile = await this.profileService.findOneByUidEager(uid);
        if (!profile) {
            throw new NotFoundException('No such profile found');
        }
        return profile;
    }

    @Put('/:uid')
    updateProfile(
        @Param('uid') uid: string,
        @Body() dto: UpdateProfileDto,
        @CurrentUser() user: User,
    ): Promise<Profile> {
        if (user.uid !== uid) {
            throw new ForbiddenException('Not allowed to update user');
        }
        if (Object.entries(dto).length === 0) {
            throw new BadRequestException('Empty request');
        }

        return this.profileService.update(user.uid, dto);
    }

    @Post('/follow/:uid')
    async follow(
        @Param('uid') otherUid: string,
        @CurrentUser() user: User,
    ): Promise<Profile> {
        const otherProfile = await this.profileService.findOneByUid(otherUid);
        if (!otherProfile) {
            throw new NotFoundException();
        }

        return this.profileService.follow(user.uid, otherProfile);
    }

    @Delete('/unfollow/:uid')
    async unFollow(
        @Param('uid') otherUid: string,
        @CurrentUser() user: User,
    ): Promise<Profile> {
        const otherProfile = await this.profileService.findOneByUid(otherUid);
        if (!otherProfile) {
            throw new NotFoundException();
        }

        return this.profileService.unFollow(user.uid, otherProfile);
    }
}
