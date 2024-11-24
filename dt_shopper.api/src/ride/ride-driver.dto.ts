import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DriverDto{

    @ApiProperty({ type: Number, required: true })
    @IsNumber()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    id: number;

    @ApiProperty({ type: String, required: true })
    @IsString()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: (args) => `Os dados ${args.property} fornecidos no corpo da requisição são inválidos. ` })
    name: string;
}