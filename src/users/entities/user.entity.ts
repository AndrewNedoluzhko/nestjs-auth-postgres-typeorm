import { BeforeUpdate, BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import * as bcrypt from 'bcryptjs';

import { Role } from "../../roles/entities/role.entity";
import BaseEntity from "../../base/base.entity";


@Entity('users')
export class User extends BaseEntity {

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 14, nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password?: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  lastname: string;

  @Column({type: 'varchar', select: false, nullable: true })
  refreshToken?:string | null;

  //user role by default
  @Column({default: 1})
  roleId: number;

  @ManyToOne((type)=> Role, (role)=> role.users, {
    eager: true
  }  )  
  @JoinColumn()
  role!: Role


  @BeforeInsert()
  @BeforeUpdate()
  async hash(): Promise<void>{
    const salt = await bcrypt.genSalt();
    if(this.password){
      this.password = await bcrypt.hashSync(this.password, salt);      
    }
    if(this.refreshToken){
      this.refreshToken = await bcrypt.hashSync(this.refreshToken, salt);
    }
  }

  async veryfyPassword(enterdPassword: string): Promise<boolean>{
    return await bcrypt.compare(enterdPassword, this.password);
  }
  
  async verifyRefreshToken(receivedRefreshToken: string): Promise<boolean>{
    return await bcrypt.compare(receivedRefreshToken, this.refreshToken);
  }

}
