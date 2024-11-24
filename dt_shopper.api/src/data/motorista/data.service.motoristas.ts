import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Motorista } from '../entidades/data.motorista.entity';

@Injectable()
export class MotoristasService {
  constructor(
    @InjectRepository(Motorista)
    private readonly motoristaRepository: Repository<Motorista>,
  ) {}

  async getMotoristas(): Promise<Motorista[]> {
    // Executa a consulta SQL diretamente usando a repository
    // Isso retornará todos os registros
    return await this.motoristaRepository.find({relations: ['review']}); 
  }

  async getMotoristaById(id: number): Promise<Motorista> {
    // Consulta SQL para filtrar dados
    return await this.motoristaRepository.findOneBy({id: id}); // Filtra pelo id fornecido
  }
}