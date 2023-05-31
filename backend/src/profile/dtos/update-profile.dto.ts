import { IsString, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';
import { Profile } from '../../common/entities';

export class UpdateProfileDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    displayName: string;

    @IsUrl()
    @IsOptional()
    profilePicUrl: string;

    @IsString()
    @IsOptional()
    bio: string;

    toEntity(): Profile {
        const profile = new Profile();
        profile.displayName = this.displayName;
        profile.profilePicUrl = this.profilePicUrl;
        profile.bio = this.bio;
        return profile;
    }
}
