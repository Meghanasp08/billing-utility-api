import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTppDataDto {
    @ApiProperty({
        description: 'Brokerage fee for the TPP.',
        example: 2.99,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    brokerage_fee: number;
}