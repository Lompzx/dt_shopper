import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMotoristas1732226539172 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
                        CREATE TABLE public.motoristas (
                        	codigomotorista serial4 NOT NULL,
                            nomemotorista varchar(50) NULL,
                            descricaomotorista varchar(500) NULL,
                            descricaocarromotorista varchar(250) NULL,
                            taxamotorista numeric(4, 2) NULL,
                            quilometragemminimamotorista int4 NULL,
                            CONSTRAINT motoristas_pkey PRIMARY KEY (codigomotorista));

                            INSERT INTO public.motoristas (
                               nomemotorista,
                               descricaomotorista,
                               descricaocarromotorista,
                               taxamotorista,
                               quilometragemminimamotorista ) 
                               VALUES 
                                   ('Homer Simpson', 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).', 'Plymouth Valiant 1973 rosa e enferrujado', 2.50, 1),
                                   ('Dominic Toretto', 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada', 'Dodge Charger R/T 1970 modificado', 5.00, 5),
                                   ('James Bond', 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.', 'Aston Martin DB5 clássico', 10.00, 10);

                           CREATE TABLE public.motoristasreviews (
	                                codigoreviewmotorista serial4 NOT NULL,
	                                notareviewmotorista bpchar(3) NULL,
	                                comentarioreviewmotorista varchar(500) NULL,
	                                codigomotorista int4 NULL,
	                                CONSTRAINT motoristasreviews_pkey PRIMARY KEY (codigoreviewmotorista));
                                    
                            ALTER TABLE public.motoristasreviews ADD CONSTRAINT fk_codigomotorista FOREIGN KEY (codigomotorista) REFERENCES public.motoristas(codigomotorista);

                            INSERT INTO public.motoristasreviews (
                                notareviewmotorista,
                                comentarioreviewmotorista,
                                codigomotorista )
                            VALUES  
                                ('2/5', 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.', 1),
                                ('4/5', 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!', 2),
                                ('5/5', 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.', 3);                                   
                            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.motoristasreviews;
            drop table public.motoristas;
            `);
    }

}
