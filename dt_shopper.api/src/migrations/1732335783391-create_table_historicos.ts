import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableHistoricos1732335783391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.historicos (
                        	codigohistorico serial4 NOT NULL,
                            codigousuario varchar(50) NOT NULL,
                            origem varchar(500) NOT NULL,
                            destino varchar(500) NOT NULL,
                            distancia numeric NOT NULL,
                            duracao varchar(50) NOT NULL,
                            codigomotorista varchar(50) NOT NULL,
                            nomemotorista varchar(50) NOT NULL,
                            valorviagem numeric(14,2) NOT NULL,
                            dataviagem timestamp NOT NULL,
                            CONSTRAINT codigohistorico_pkey PRIMARY KEY (codigohistorico)
                            );
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
                drop table public.historicos;
            `);
    }    

}
