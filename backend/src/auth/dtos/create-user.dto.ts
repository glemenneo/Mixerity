import {
    IsEmail,
    IsString,
    IsNotEmpty,
    MinLength,
    IsDefined,
} from 'class-validator';
import { User, Profile } from '../../common/entities';

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

    toEntity(uid: string): User {
        const user = new User();
        user.uid = uid;
        user.email = this.email;
        user.username = this.username;
        user.password = this.password;
        const profile = new Profile();
        profile.uid = uid;
        profile.displayName = this.username;
        user.profile = profile;
        return user;
    }
}
