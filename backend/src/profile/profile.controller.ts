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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/common/guards';
import { FindProfileDto, Profile } from './entities';
import { EditProfileDto } from './dtos';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('/find/:uid')
    async getProfile(@Param('uid') uid): Promise<Profile> {
        const profile = await this.profileService.findOneByUidEager(uid);
        if (!profile) {
            throw new NotFoundException();
        }

        return profile;
    }

    @Post('/find')
    findProfiles(@Body() dto: FindProfileDto): Promise<Profile[]> {
        return this.profileService.find(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/self')
    getOwnProfile(@Request() req): Promise<Profile> {
        const { uid } = req.user;
        return this.profileService.findOneByUidEager(uid);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/edit')
    editProfile(@Request() req, @Body() dto: EditProfileDto): Promise<Profile> {
        const uid = req.user.uid;
        return this.profileService.update(uid, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/follow/:uid')
    async follow(
        @Request() req,
        @Param('uid') otherUid: number,
    ): Promise<Profile> {
        const otherProfile = await this.profileService.findOneByUid(otherUid);
        if (!otherProfile) {
            throw new NotFoundException();
        }

        return this.profileService.follow(req.user.uid, otherProfile);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/unFollow/:uid')
    async unFollow(
        @Request() req,
        @Param('uid') otherUid: number,
    ): Promise<Profile> {
        const otherProfile = await this.profileService.findOneByUid(otherUid);
        if (!otherProfile) {
            throw new NotFoundException();
        }

        return this.profileService.unFollow(req.user.uid, otherProfile);
    }
}
