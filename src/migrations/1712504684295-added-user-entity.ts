import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1712504684295 implements MigrationInterface {
    name = 'addedUserEntity1712504684295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "columns" ADD "order" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "columns" DROP COLUMN "order"`);
    }

}
