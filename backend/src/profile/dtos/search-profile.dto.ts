import { IsOptional, IsUUID, IsString } from 'class-validator';

export class SearchProfileDto {
    @IsOptional()
    @IsUUID()
    uid: string;

    @IsOptional()
    @IsString()
    displayName: string;
}
