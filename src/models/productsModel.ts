import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Company } from "./companyModel";
import { Photo } from "./porduct_photoModel";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name: string = "";

  @Column()
  description: string = "";

  @Column({ type: "decimal" })
  price!: number;

  @ManyToOne(() => Company, (company) => company.products, {
    onDelete: "CASCADE",
  })
  company!: Company;

  @OneToOne(() => Photo, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  photo!: Photo;

  @CreateDateColumn()
  created_at: Date | undefined;
  @UpdateDateColumn()
  updated_at: Date | undefined;
}
