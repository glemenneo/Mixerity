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
import { Profile } from './entities';
import { EditProfileDto, SearchProfileDto } from './dtos';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('/all')
    async getAll() {
        return this.profileService.find({});
    }

    @Get('/get/:uid')
    async getOne(@Param('uid') uid): Promise<Profile> {
        const profile = await this.profileService.findOneByUidEager(uid);
        if (!profile) {
            throw new NotFoundException('No such profile found');
        }
        return profile;
    }

    @Post('/search')
    findProfiles(@Body() dto: SearchProfileDto): Promise<Profile[]> {
        return this.profileService.find(dto);
    }

    @Put('/edit')
    editProfile(@Request() req, @Body() dto: EditProfileDto): Promise<Profile> {
        const uid = req.user.uid;
        return this.profileService.update(uid, dto);
    }

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
