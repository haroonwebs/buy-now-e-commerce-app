import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  photo_url!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
