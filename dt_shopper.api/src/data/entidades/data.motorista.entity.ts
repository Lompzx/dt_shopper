import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from 'typeorm';
import { MotoristaReview } from './data.motoristasreviews.entity';

@Entity('motoristas')
export class Motorista {
  @PrimaryGeneratedColumn({name:"codigomotorista" })
  id: number;

  @Column({ name: "nomemotorista", type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({name: "descricaomotorista", type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column({name: "descricaocarromotorista", type: 'varchar', length: 250, nullable: true })
  vehicle: string;

  @OneToMany(() => MotoristaReview, (review) => review.motorista)
  review: MotoristaReview[];

  @Column({ name: "taxamotorista",type: 'numeric', precision: 4, scale: 2, nullable: true })
  value: number;

  @Column({ name: "quilometragemminimamotorista",type: 'int', nullable: true })
  quilometragemminimamotorista: number;

}