import {
    IsOptional,
    IsUUID,
    IsEmail,
    IsString,
    MaxLength,
    IsNotEmpty,
} from 'class-validator';

export class SearchUserDto {
    @IsOptional()
    @IsUUID()
    uid: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    username: string;
}
