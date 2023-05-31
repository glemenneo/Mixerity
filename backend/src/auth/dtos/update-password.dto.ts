import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { User } from '../../common/entities';

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    old_password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    new_password: string;

    toEntity(uid: string): User {
        const user = new User();
        user.uid = uid;
        user.password = this.new_password;
        return user;
    }
}
