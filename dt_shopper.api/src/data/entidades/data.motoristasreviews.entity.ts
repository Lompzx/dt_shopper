import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Motorista } from './data.motorista.entity';

@Entity('motoristasreviews')
export class MotoristaReview {
  @PrimaryGeneratedColumn()
  codigoreviewmotorista: number;

  @Column({ name: "notareviewmotorista", type: 'char', length: 3, nullable: true })
  rating: string;

  @Column({name: "comentarioreviewmotorista", type: 'varchar', length: 500, nullable: true })
  coment: string;

  @ManyToOne(() => Motorista, (motorista) => motorista.review, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'codigomotorista' })
  motorista: Motorista;
}
