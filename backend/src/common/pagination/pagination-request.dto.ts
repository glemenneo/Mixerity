import {
    IsDefined,
    IsEnum,
    IsNumber,
    IsString,
    IsOptional,
    Min,
} from 'class-validator';
import { OrderBy } from '../constants/constants.enum';

export class PaginationRequestDto {
    @IsDefined()
    @IsNumber()
    @Min(0)
    take: number;

    @IsDefined()
    @IsNumber()
    @Min(0)
    skip: number;

    @IsOptional()
    @IsString()
    search_string: string;

    @IsOptional()
    @IsString()
    column: string;

    @IsOptional()
    @IsEnum(OrderBy)
    orderBy: OrderBy;

    constructor(partial: Partial<PaginationRequestDto>) {
        Object.assign(this, partial);
    }
}
