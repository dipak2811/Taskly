import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1708253007717 implements MigrationInterface {
    name = 'addedUserEntity1708253007717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('todo', 'inProgress', 'testing', 'complete', 'onHold', 'canceled', 'reopened')`);
        await queryRunner.query(`CREATE TYPE "public"."task_label_enum" AS ENUM('frontend', 'backend', 'database', 'devops', 'testing', 'design', 'documentation', 'research', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum" AS ENUM('blocker', 'critical', 'major', 'minor', 'trivial')`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."task_status_enum" NOT NULL DEFAULT 'todo', "label" "public"."task_label_enum" NOT NULL, "reporterId" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "priority" "public"."task_priority_enum" NOT NULL DEFAULT 'major', "attachment" text NOT NULL, "comments" jsonb, "listId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "path" character varying NOT NULL, "folderId" uuid, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_folders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "creatorId" character varying NOT NULL, "path" character varying NOT NULL DEFAULT '/', "isShared" boolean NOT NULL DEFAULT false, "permission" character varying NOT NULL DEFAULT 'write', CONSTRAINT "PK_b21b4fb680573a813afce21727a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_assignees_users" ("taskId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_0653ee9ab3394b7f91c272d6987" PRIMARY KEY ("taskId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2b86223a60e6335043e4ec5ff5" ON "task_assignees_users" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_69839cd5a157b14063c8783fe9" ON "task_assignees_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "project_folders_users_users" ("projectFoldersId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_8ff0d5969927cd66df56856fc8e" PRIMARY KEY ("projectFoldersId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_38f8913b62e429c6130255e632" ON "project_folders_users_users" ("projectFoldersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8deaf7e4f72ba59562937f894c" ON "project_folders_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d2275fe92da6a114d70796b7344" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_94470298e9136c44fde84cc5b49" FOREIGN KEY ("folderId") REFERENCES "project_folders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_assignees_users" ADD CONSTRAINT "FK_2b86223a60e6335043e4ec5ff56" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_assignees_users" ADD CONSTRAINT "FK_69839cd5a157b14063c8783fe98" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_folders_users_users" ADD CONSTRAINT "FK_38f8913b62e429c6130255e6322" FOREIGN KEY ("projectFoldersId") REFERENCES "project_folders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_folders_users_users" ADD CONSTRAINT "FK_8deaf7e4f72ba59562937f894cd" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_folders_users_users" DROP CONSTRAINT "FK_8deaf7e4f72ba59562937f894cd"`);
        await queryRunner.query(`ALTER TABLE "project_folders_users_users" DROP CONSTRAINT "FK_38f8913b62e429c6130255e6322"`);
        await queryRunner.query(`ALTER TABLE "task_assignees_users" DROP CONSTRAINT "FK_69839cd5a157b14063c8783fe98"`);
        await queryRunner.query(`ALTER TABLE "task_assignees_users" DROP CONSTRAINT "FK_2b86223a60e6335043e4ec5ff56"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_94470298e9136c44fde84cc5b49"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d2275fe92da6a114d70796b7344"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8deaf7e4f72ba59562937f894c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_38f8913b62e429c6130255e632"`);
        await queryRunner.query(`DROP TABLE "project_folders_users_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_69839cd5a157b14063c8783fe9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b86223a60e6335043e4ec5ff5"`);
        await queryRunner.query(`DROP TABLE "task_assignees_users"`);
        await queryRunner.query(`DROP TABLE "project_folders"`);
        await queryRunner.query(`DROP TABLE "lists"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_label_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    }

}
