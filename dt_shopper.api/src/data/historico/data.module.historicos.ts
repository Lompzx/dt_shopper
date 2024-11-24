import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricosService } from './data.service.motoristas';
import { Historicos } from '../entidades/data.historico.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Historicos])],
    providers: [HistoricosService],
    exports: [HistoricosService],
  })
  export class HistoricosModule {}