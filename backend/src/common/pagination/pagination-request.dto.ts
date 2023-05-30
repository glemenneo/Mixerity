import {
    IsDefined,
    IsEnum,
    IsNumber,
    IsString,
    IsOptional,
    Min,
    ValidateIf,
} from 'class-validator';
import { OrderBy, UserColumns } from '../constants/constants.enum';

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
    @IsEnum(UserColumns)
    column: string;

    @ValidateIf((dto) => typeof dto.column !== 'undefined')
    @IsEnum(OrderBy)
    order_by: OrderBy;

    constructor(partial: Partial<PaginationRequestDto>) {
        Object.assign(this, partial);
    }
}
