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
        @Request() req,
        @Body() dto: UpdateProfileDto,
    ): Promise<Profile> {
        if (req.user.uid !== uid) {
            throw new ForbiddenException('Not allowed to update user');
        }
        if (Object.entries(dto).length === 0) {
            throw new BadRequestException('Empty request');
        }

        return this.profileService.update(req.user.uid, dto);
    }

    @Post('/follow/:uid')
    async follow(
        @Request() req,
        @Param('uid') otherUid: string,
    ): Promise<Profile> {
        const otherProfile = await this.profileService.findOneByUid(otherUid);
        if (!otherProfile) {
            throw new NotFoundException();
        }

        return this.profileService.follow(req.user.uid, otherProfile);
    }

    @Delete('/unfollow/:uid')
    async unFollow(
        @Request() req,
        @Param('uid') otherUid: string,
    ): Promise<Profile> {
        const otherProfile = await this.profileService.findOneByUid(otherUid);
        if (!otherProfile) {
            throw new NotFoundException();
        }

        return this.profileService.unFollow(req.user.uid, otherProfile);
    }
}
