import {
    IsEmail,
    IsString,
    IsNotEmpty,
    MinLength,
    IsDefined,
} from 'class-validator';

export class CreateUserDto {
    @IsDefined()
    @IsEmail()
    email: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
