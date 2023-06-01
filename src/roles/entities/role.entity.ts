import { User } from "../../users/entities/user.entity";
import { Column, Entity,  OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 120, nullable: false})
  name: string;

  @OneToMany(()=> User, user => user.role)
  users: User[];
}