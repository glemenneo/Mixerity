import {
    IsOptional,
    IsEmail,
    IsString,
    IsNotEmpty,
    MaxLength,
} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    username: string;
}
