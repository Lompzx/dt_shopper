import { IsString, IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DriverDto } from './ride-driver.dto';
import { Transform } from 'class-transformer';

export class RideConfirmDto {

    @ApiProperty({ type: String, required: true })
    @IsString()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    customer_id: string;

    @ApiProperty({ type: String, required: true })
    @IsString()
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    @Transform(({ value }) => value?.trim())
    origin: string;
    
    @ApiProperty({ type: String, required: true })
    @IsString()
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    @Transform(({ value }) => value?.trim())
    destination: string;
    
    @ApiProperty({ type: Number, required: true })
    @IsNumber()
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    distance: number;

    @ApiProperty({ type: String, required: true })
    @IsString()
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    @Transform(({ value }) => value?.trim())
    duration: string;

    @ApiProperty({ type: DriverDto, required: true })
    @IsObject()
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    driver: DriverDto;

    @ApiProperty({ type: Number, required: true })
    @IsNumber()
    @Transform(({ value }) => (typeof value === 'string' ? parseFloat(value.trim()) : value))
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    value: number;    
}

