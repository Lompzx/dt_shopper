//Controller Restful, mesmo conceito .NET, algumas mudanças de anotations
//@Body = [FromBody] .net

import { Controller, Post, Patch, Get, Param, Delete, Body, UseFilters, Query } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideEstimateDto } from './ride-estimate.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CustomHttpExceptionFilter } from 'src/http-exception.filter';
import { RideConfirmDto } from './ride-confirm.dto';
import { STATUS_CODES } from 'http';

@Controller('ride')
@UseFilters(CustomHttpExceptionFilter)
export class RideController {
    constructor(private readonly rideService: RideService) { }

    @ApiOperation({ summary: "Responsável por receber a origem e o destino da viagem e realizar os cálculos dos valores da viagem" })
    @ApiResponse({ status: 200, description: 'Operação realizada com sucesso.' })
    @ApiBadRequestResponse({ description: 'Os dados fornecidos no corpo da requisição estão inválidos.' })
    @Post('estimate')
    async estimateRide(@Body() rideEstimateDto: RideEstimateDto) {
        return this.rideService.estimateRide(rideEstimateDto);
    }

    @ApiOperation({ summary: "Responsável por confirmar a viagem e gravá-la no histórico" })
    @ApiResponse({ status: 200, description: 'Operação realizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Motorista não encontrado.' })
    @ApiResponse({ status: 406, description: 'Quilometragem inválida para o motorista.' })
    @ApiBadRequestResponse({ description: 'Os dados fornecidos no corpo da requisição são inválidos.' })
    @Patch('confirm')
    async confirmRide(@Body() rideConfirmDto: RideConfirmDto) {
        return this.rideService.confirmRide(rideConfirmDto);
    }

    @ApiOperation({ summary: "Responsável por listar as viagens realizadas por um determinado usuário" })
    @ApiResponse({ status: 200, description: 'Operação realizada com sucesso.' })
    @ApiResponse({ status: 404, description: 'Nenhum registro encontrado.' })
    @ApiBadRequestResponse({ description: 'Motorista inválido.' })
    @ApiQuery({ name: 'customer_id', required: true, description: 'ID do cliente' })
    @ApiQuery({ name: 'driver_id', required: false, description: 'ID do motorista', type: String })
    @Get()
    async getListOfTripsByUser(
        @Query('customer_id') customer_id: string,
        @Query('driver_id') driver_id?: string) {
        return this.rideService.getListOfTripsByUser(customer_id, driver_id);
    }
}