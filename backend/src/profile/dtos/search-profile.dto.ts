import { IsOptional, IsNumber, IsString } from 'class-validator';

export class SearchProfileDto {
    @IsOptional()
    @IsNumber()
    uid: number;

    @IsOptional()
    @IsString()
    displayName: string;
}
