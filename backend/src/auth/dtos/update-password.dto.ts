import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
