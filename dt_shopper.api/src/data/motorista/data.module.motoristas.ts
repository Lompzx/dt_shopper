import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoristasService } from './data.service.motoristas';
import { Motorista } from '../entidades/data.motorista.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Motorista])],
    providers: [MotoristasService],
    exports: [MotoristasService],
  })
  export class MotoristasModule {}