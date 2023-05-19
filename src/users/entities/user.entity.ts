import BaseEntity from "../../base/base.entity";
import { Column, Entity } from "typeorm";

@Entity('users')
export class User extends BaseEntity{

  @Column({type: 'varchar', length: 255, nullable: false, unique: true})
  email: string;
  
  @Column({ name: 'phone_number', type: 'varchar', length: 14, nullable: false})
  phoneNumber: string;
  
  @Column({ type: 'varchar', select: false, nullable: false})
  password: string;

@Column({type: 'varchar', length: 120, nullable: false})
firstName: string;

@Column({type: 'varchar', length: 120, nullable: false})
lastName: string;

}
