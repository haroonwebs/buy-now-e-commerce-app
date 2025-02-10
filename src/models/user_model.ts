import { boolean } from "joi";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserRole {
  Admin = "admin",
  User = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  user_name!: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    nullable: false,
  })
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.User,
  })
  user_role!: UserRole;

  @Column({
    nullable: true,
  })
  otp!: string;

  @Column({ nullable: true })
  otp_expiry!: Date;

  @Column({
    type: "boolean",
    default: false,
  })
  isVerified!: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
