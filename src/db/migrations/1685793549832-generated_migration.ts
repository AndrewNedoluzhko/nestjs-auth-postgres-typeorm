import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1685793549832 implements MigrationInterface {
    name = 'GeneratedMigration1685793549832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phone_number" TO "phoneNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phoneNumber" TO "phone_number"`);
    }

}
