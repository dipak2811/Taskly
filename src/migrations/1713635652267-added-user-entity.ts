import { MigrationInterface, QueryRunner } from "typeorm";

export class addedUserEntity1713635652267 implements MigrationInterface {
    name = 'addedUserEntity1713635652267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "content" character varying NOT NULL, "image" character varying NOT NULL DEFAULT 'default-post.png', "userId" uuid, CONSTRAINT "UQ_2d82eb2bb2ddd7a6bfac8804d8a" UNIQUE ("title"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "photo" character varying NOT NULL DEFAULT 'default.png', "verified" boolean NOT NULL DEFAULT false, "verificationCode" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "verificationCode_index" ON "users" ("verificationCode") `);
        await queryRunner.query(`CREATE TABLE "project_folders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "creatorId" character varying NOT NULL, "path" character varying NOT NULL DEFAULT '/', "isShared" boolean NOT NULL DEFAULT false, "permission" character varying NOT NULL DEFAULT 'write', "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b21b4fb680573a813afce21727a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."task_status_enum" NOT NULL DEFAULT 'todo', "label" "public"."task_label_enum" array NOT NULL DEFAULT '{}', "reporterId" character varying NOT NULL, "dueDate" TIMESTAMP array NOT NULL DEFAULT '{}', "priority" "public"."task_priority_enum" NOT NULL DEFAULT 'major', "attachment" text NOT NULL, "comments" jsonb, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "path" character varying NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "folderId" uuid, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "order" integer NOT NULL, "kanbanId" uuid, CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "kanban_board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "creatorId" character varying NOT NULL, CONSTRAINT "REL_13b70600eb05b88962798b19f4" UNIQUE ("id"), CONSTRAINT "PK_13b70600eb05b88962798b19f4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_folders_users_users" ("projectFoldersId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_8ff0d5969927cd66df56856fc8e" PRIMARY KEY ("projectFoldersId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_38f8913b62e429c6130255e632" ON "project_folders_users_users" ("projectFoldersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8deaf7e4f72ba59562937f894c" ON "project_folders_users_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "task_assignees_users" ("taskId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_0653ee9ab3394b7f91c272d6987" PRIMARY KEY ("taskId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2b86223a60e6335043e4ec5ff5" ON "task_assignees_users" ("taskId") `);
        await queryRunner.query(`CREATE INDEX "IDX_69839cd5a157b14063c8783fe9" ON "task_assignees_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "kanban_board_users_users" ("kanbanBoardId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_920d92ade3a2cbbf276d354ad6e" PRIMARY KEY ("kanbanBoardId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c1ce4c0adce38c6716112fa54c" ON "kanban_board_users_users" ("kanbanBoardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a4ee2fba4662524cfc8982886" ON "kanban_board_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_fb213f79ee45060ba925ecd576e" FOREIGN KEY ("id") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_94470298e9136c44fde84cc5b49" FOREIGN KEY ("folderId") REFERENCES "project_folders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_19de9f29d8526e90bce57b343b6" FOREIGN KEY ("kanbanId") REFERENCES "kanban_board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kanban_board" ADD CONSTRAINT "FK_13b70600eb05b88962798b19f4a" FOREIGN KEY ("id") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_folders_users_users" ADD CONSTRAINT "FK_38f8913b62e429c6130255e6322" FOREIGN KEY ("projectFoldersId") REFERENCES "project_folders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_folders_users_users" ADD CONSTRAINT "FK_8deaf7e4f72ba59562937f894cd" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_assignees_users" ADD CONSTRAINT "FK_2b86223a60e6335043e4ec5ff56" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_assignees_users" ADD CONSTRAINT "FK_69839cd5a157b14063c8783fe98" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "kanban_board_users_users" ADD CONSTRAINT "FK_c1ce4c0adce38c6716112fa54c1" FOREIGN KEY ("kanbanBoardId") REFERENCES "kanban_board"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "kanban_board_users_users" ADD CONSTRAINT "FK_0a4ee2fba4662524cfc89828869" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kanban_board_users_users" DROP CONSTRAINT "FK_0a4ee2fba4662524cfc89828869"`);
        await queryRunner.query(`ALTER TABLE "kanban_board_users_users" DROP CONSTRAINT "FK_c1ce4c0adce38c6716112fa54c1"`);
        await queryRunner.query(`ALTER TABLE "task_assignees_users" DROP CONSTRAINT "FK_69839cd5a157b14063c8783fe98"`);
        await queryRunner.query(`ALTER TABLE "task_assignees_users" DROP CONSTRAINT "FK_2b86223a60e6335043e4ec5ff56"`);
        await queryRunner.query(`ALTER TABLE "project_folders_users_users" DROP CONSTRAINT "FK_8deaf7e4f72ba59562937f894cd"`);
        await queryRunner.query(`ALTER TABLE "project_folders_users_users" DROP CONSTRAINT "FK_38f8913b62e429c6130255e6322"`);
        await queryRunner.query(`ALTER TABLE "kanban_board" DROP CONSTRAINT "FK_13b70600eb05b88962798b19f4a"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_19de9f29d8526e90bce57b343b6"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_94470298e9136c44fde84cc5b49"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_fb213f79ee45060ba925ecd576e"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a4ee2fba4662524cfc8982886"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c1ce4c0adce38c6716112fa54c"`);
        await queryRunner.query(`DROP TABLE "kanban_board_users_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_69839cd5a157b14063c8783fe9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b86223a60e6335043e4ec5ff5"`);
        await queryRunner.query(`DROP TABLE "task_assignees_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8deaf7e4f72ba59562937f894c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_38f8913b62e429c6130255e632"`);
        await queryRunner.query(`DROP TABLE "project_folders_users_users"`);
        await queryRunner.query(`DROP TABLE "kanban_board"`);
        await queryRunner.query(`DROP TABLE "columns"`);
        await queryRunner.query(`DROP TABLE "lists"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "project_folders"`);
        await queryRunner.query(`DROP INDEX "public"."verificationCode_index"`);
        await queryRunner.query(`DROP INDEX "public"."email_index"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
