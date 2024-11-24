import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('historicos')
export class Historicos {
    @PrimaryGeneratedColumn()
    codigohistorico: number;

    @Column({ name: "codigousuario", type: 'varchar', length: 50, nullable: true })
    customer_id: string;

    @Column({ name: "origem", type: 'varchar', length: 500, nullable: true })
    origin: string;

    @Column({name: "destino",  type: 'varchar', length: 500, nullable: true })
    destination: string;

    @Column({ name: "distancia", type: 'numeric', nullable: true })
    distance: number;

    @Column({ name: "duracao", type: 'varchar', length: 50, nullable: true })
    duration: string;

    @Column({ name: "codigomotorista", type: 'varchar', length: 50, nullable: true })
    id: string;

    @Column({ name: "nomemotorista", type: 'varchar', length: 50, nullable: true })
    name: string;

    @Column({ name: "valorviagem", type: 'numeric', precision: 14, scale: 2, nullable: true })
    value: number;

    @Column({ name: "dataviagem", type: 'timestamp', nullable: false })
    date: Date;   

}