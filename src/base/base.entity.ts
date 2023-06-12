import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

abstract class BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
export default BaseEntity;