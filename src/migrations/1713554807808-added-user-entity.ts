import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1713554807808 implements MigrationInterface {
    name = 'addedUserEntity1713554807808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."task_status_enum" NOT NULL DEFAULT 'todo', "label" "public"."task_label_enum" array NOT NULL DEFAULT '{}', "reporterId" character varying NOT NULL, "dueDate" TIMESTAMP array NOT NULL DEFAULT '{}', "priority" "public"."task_priority_enum" NOT NULL DEFAULT 'major', "attachment" text NOT NULL, "comments" jsonb, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_assignees_users" ("taskId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_0653ee9ab3394b7f91c272d6987" PRIMARY KEY ("taskId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2b86223a60e6335043e4ec5ff5" ON "task_assignees_users" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_69839cd5a157b14063c8783fe9" ON "task_assignees_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_fb213f79ee45060ba925ecd576e" FOREIGN KEY ("id") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_assignees_users" ADD CONSTRAINT "FK_2b86223a60e6335043e4ec5ff56" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_assignees_users" ADD CONSTRAINT "FK_69839cd5a157b14063c8783fe98" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_assignees_users" DROP CONSTRAINT "FK_69839cd5a157b14063c8783fe98"`);
        await queryRunner.query(`ALTER TABLE "task_assignees_users" DROP CONSTRAINT "FK_2b86223a60e6335043e4ec5ff56"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_fb213f79ee45060ba925ecd576e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_69839cd5a157b14063c8783fe9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b86223a60e6335043e4ec5ff5"`);
        await queryRunner.query(`DROP TABLE "task_assignees_users"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
