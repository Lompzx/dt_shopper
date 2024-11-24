//Module é monta a estrutura de referências
import { Module } from '@nestjs/common';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';
import { ConfigModule } from '@nestjs/config';
import { MotoristasModule } from 'src/data/motorista/data.module.motoristas';
import { HistoricosModule } from 'src/data/historico/data.module.historicos';

@Module({
    imports: [ConfigModule, MotoristasModule, HistoricosModule],
    controllers: [RideController],
    providers: [RideService]
})

export class RideModule { }