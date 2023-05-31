import {
    IsDefined,
    IsEnum,
    IsNumber,
    IsString,
    IsOptional,
    Min,
    ValidateIf,
} from 'class-validator';
import { OrderBy } from '../constants';

export class PaginationRequestDto {
    @IsDefined()
    @IsNumber()
    @Min(0)
    offset: number;

    @IsDefined()
    @IsNumber()
    @Min(1)
    limit: number;

    @IsOptional()
    @IsString()
    search_string: string;

    @ValidateIf((dto) => typeof dto.order_by !== 'undefined')
    @IsString()
    column: string;

    @ValidateIf((dto) => typeof dto.column !== 'undefined')
    @IsEnum(OrderBy)
    order_by: OrderBy;

    constructor(partial: Partial<PaginationRequestDto>) {
        Object.assign(this, partial);
    }
}
