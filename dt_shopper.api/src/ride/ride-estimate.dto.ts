import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RideEstimateDto {

    @ApiProperty({type: String, required: true})
    @IsString()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    customer_id: string;

    @ApiProperty({type: String, required: true})
    @IsString()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    origin: string;

    @ApiProperty({type: String, required: true})
    @IsString()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    destination: string;
}