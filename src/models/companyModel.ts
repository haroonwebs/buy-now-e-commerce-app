import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./productsModel";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name: string = "";

  @Column()
  description: string = "";

  @OneToMany(() => Product, (product) => product.company, { cascade: true })
  products!: Product[];

  @CreateDateColumn()
  created_at: Date | undefined;

  @UpdateDateColumn()
  updated_at: Date | undefined;
}
