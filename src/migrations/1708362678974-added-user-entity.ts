import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1708362678974 implements MigrationInterface {
    name = 'addedUserEntity1708362678974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "lists" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "project_folders" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_folders" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "deleted_at"`);
    }

}
