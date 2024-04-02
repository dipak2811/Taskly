import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1711879611164 implements MigrationInterface {
    name = 'addedUserEntity1711879611164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d2275fe92da6a114d70796b7344"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "listId"`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_fb213f79ee45060ba925ecd576e" FOREIGN KEY ("id") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_fb213f79ee45060ba925ecd576e"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "listId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d2275fe92da6a114d70796b7344" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
