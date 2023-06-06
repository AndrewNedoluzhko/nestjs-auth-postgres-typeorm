
import { ConfigService } from "@nestjs/config";
import {config} from "dotenv";
//import { User } from "src/users/entities/user.entity";
import { User } from "../users/entities/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";
import { CreatedMigration1685382494385 } from "./migrations/1685382494385-created_migration";
import { GeneratedMigration1685382819168 } from "./migrations/1685382819168-generated_migration";
import { SeedRoles1565812987671 } from "./migrations/1685125258893-seed_roles";
import { Role } from "../roles/entities/role.entity";
import { GeneratedMigration1685795112108 } from "./migrations/1685795112108-generated_migration";

config();
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USER_NAME'),
  password: configService.get('DB_USER_PASSWORD'),
  database: configService.get('DB_NAME'),
  logging: true,
  synchronize: true,
  migrationsTableName: 'migrations',
  entities: [
      User, Role
      //'dist/**/entities/*.entity{.ts,.js}'
  ],
  migrations: [
    CreatedMigration1685382494385,
    GeneratedMigration1685382819168,
    SeedRoles1565812987671,
    GeneratedMigration1685795112108
      //'dist/db/migrations/*.js'   
  ]   
}

export const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize()
  .then(()=> console.log("Data Source has been initialized"))
  .catch((error)=>console.log("Error initializating Data Source", error))

