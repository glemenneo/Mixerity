import { IsString, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';

export class EditProfileDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    displayname: string;

    @IsUrl()
    @IsOptional()
    profilePicUrl: string;

    @IsString()
    @IsOptional()
    bio: string;
}
