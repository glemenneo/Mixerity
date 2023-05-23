import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}
