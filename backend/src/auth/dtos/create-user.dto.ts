import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateYserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
