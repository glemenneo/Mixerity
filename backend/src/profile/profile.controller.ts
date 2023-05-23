import {
    Controller,
    UseGuards,
    Request,
    Get,
    Param,
    Put,
    Body,
    NotFoundException,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/common/guards/index';
import { Profile } from './entities/index';
import { EditProfileDto } from './dtos/index';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('/find/:uid')
    async findProfile(@Param('uid') uid): Promise<Profile> {
        const profile = await this.profileService.findOneByUid(uid);
        if (!profile) {
            throw new NotFoundException();
        }
        return profile;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/self')
    getOwnProfile(@Request() req): Promise<Profile> {
        const { uid } = req.user;
        return this.profileService.findOneByUid(uid);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/edit')
    editProfile(@Request() req, @Body() dto: EditProfileDto): Promise<Profile> {
        const uid = req.user.uid;
        return this.profileService.update(uid, dto);
    }
}
