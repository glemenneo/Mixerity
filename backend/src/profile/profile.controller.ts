import {
    Controller,
    UseGuards,
    Request,
    Get,
    Param,
    Put,
    Body,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Profile } from './entities/profile.entity';
import { EditProfileDto } from './dtos/edit-profile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('/:id')
    findProfile(@Param('uid') uid): Promise<Profile> {
        return this.profileService.findOneByUid(uid);
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
