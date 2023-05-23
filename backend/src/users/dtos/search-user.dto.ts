import { IsOptional, IsNumber, IsEmail, IsString, MaxLength } from 'class-validator';

export class SearchUserDto {
    @IsOptional()
    @IsNumber()
    uid: number;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    username: string;
}
