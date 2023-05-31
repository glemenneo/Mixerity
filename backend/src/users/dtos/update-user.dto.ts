import {
    IsOptional,
    IsEmail,
    IsString,
    IsNotEmpty,
    MaxLength,
} from 'class-validator';
import { User } from '../entities';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    username: string;

    toEntity(): User {
        const user = new User();
        user.email = this.email;
        user.username = this.username;
        return user;
    }
}
