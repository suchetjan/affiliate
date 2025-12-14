import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Product } from '../products/product.entity';

@Entity('offer')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.offers)
  @JoinColumn({ name: 'product_id' })
  product: Product | { id: string };

  @Column()
  marketplace: string;

  @Column()
  store_name: string;

  @Column('numeric')
  price: number;

  @Column({ type: 'timestamptz', nullable: true })
  last_checked_at: Date | null;
}
