import { Module } from '@nestjs/common';
import { RideModule } from './ride/ride.module';
import { ConfigModule } from '@nestjs/config'; // torna possivel leitura variavel de ambiente
import { MotoristasModule } from './data/motorista/data.module.motoristas';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { HistoricosModule } from './data/historico/data.module.historicos';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,      
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dt_shopper_postgres', 
      port: 5432,
      username: 'desenvolvedor',
      password: 'desenvolvedor',
      database: 'dbDTShopper',
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migrations/{.ts,*.js}`],      
      migrationsRun : true,
      synchronize: true,
      logging: true
    }),
    HistoricosModule,
    MotoristasModule,
    RideModule], 
})
export class AppModule {}
