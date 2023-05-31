import {
    IsEmail,
    IsString,
    IsNotEmpty,
    MinLength,
    IsDefined,
} from 'class-validator';
import { User } from '../../users/entities';

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

    toEntity(): User {
        const user = new User();
        user.email = this.email;
        user.username = this.username;
        user.password = this.password;
        return user;
    }
}
