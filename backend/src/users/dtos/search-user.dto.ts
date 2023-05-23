import {
    IsOptional,
    IsNumber,
    IsEmail,
    IsString,
    MaxLength,
    IsNotEmpty,
} from 'class-validator';

export class SearchUserDto {
    @IsOptional()
    @IsNumber()
    uid: number;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    username: string;
}
