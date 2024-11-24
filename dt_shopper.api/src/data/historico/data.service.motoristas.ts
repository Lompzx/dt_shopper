import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historicos } from '../entidades/data.historico.entity';

@Injectable()
export class HistoricosService {
  constructor(
    @InjectRepository(Historicos)
    private readonly historicoRepository: Repository<Historicos>,
  ) { }

  async getHistorico(): Promise<Historicos[]> {
    // Executa a consulta SQL diretamente usando a repository
    // Isso retornará todos os registros
    return await this.historicoRepository.find();
  }

  async getHistoricoById(id: number): Promise<Historicos> {
    // Consulta SQL para filtrar dados
    return await this.historicoRepository.findOneBy({ codigohistorico: id }); // Filtra pelo id fornecido
  }

  async saveHistorico(historico: Historicos): Promise<Historicos> {
    // O método save persiste no banco de dados. 
    // Ele atualiza se um id já existir ou cria um novo registro caso contrário.
    return await this.historicoRepository.save(historico);
  }
  
  async listHistoricoByUser(customer_id: string, driver_id?: string): Promise<Historicos[]> {
    
    let whereExp: any = { where: { customer_id: customer_id } };
    if (driver_id)
      whereExp.where.id = driver_id;

    return await this.historicoRepository.find({
      where: whereExp.where,
      order: { date: 'DESC' },
    });
  }
}