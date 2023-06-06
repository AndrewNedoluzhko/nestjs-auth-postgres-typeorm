import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1685795112108 implements MigrationInterface {
    name = 'GeneratedMigration1685795112108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phoneNumber" character varying(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstname" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastname" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone_number" character varying(14) NOT NULL`);
    }

}
