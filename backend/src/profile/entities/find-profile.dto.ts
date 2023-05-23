import { IsOptional, IsNumber, IsString } from 'class-validator';

export class FindProfileDto {
    @IsOptional()
    @IsNumber()
    uid: number;

    @IsOptional()
    @IsString()
    displayName: string;
}
