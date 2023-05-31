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

    toEntity(uid: string): User {
        const user = new User();
        user.uid = uid;
        user.email = this.email;
        user.username = this.username;
        return user;
    }
}
