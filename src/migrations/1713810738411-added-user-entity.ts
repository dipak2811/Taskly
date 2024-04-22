import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1713810738411 implements MigrationInterface {
    name = 'addedUserEntity1713810738411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "attachment" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "attachment" SET NOT NULL`);
    }

}
