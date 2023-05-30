import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    old_password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    new_password: string;
}
