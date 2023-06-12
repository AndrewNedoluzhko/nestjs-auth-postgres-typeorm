import { Column, Entity,  JoinColumn,  OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
@Entity('roles')
export class Role{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 120, nullable: false})
  name: string;

  @OneToMany((type)=> User, (user) => user.role)
  @JoinColumn()
  users!: User[];
}