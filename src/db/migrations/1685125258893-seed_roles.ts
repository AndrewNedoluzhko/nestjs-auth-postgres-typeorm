import { MigrationInterface, QueryRunner } from "typeorm";
import { Role } from "../../roles/entities/role.entity";
export class SeedRoles1565812987671 implements MigrationInterface {
  name = `SeedRoles1565812987671`;

  public async up(queryRunner: QueryRunner): Promise<any> {

    const rolesRepo = queryRunner.manager.getRepository(Role);

    const userRole = rolesRepo.create({
      id: 1,
      name: 'User'
    });

    const adminRole = rolesRepo.create({
      id: 2,
      name: 'Admin'
    });
    await rolesRepo.save([userRole, adminRole]);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<any> { }
}




