import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Product } from '../products/product.entity';
import { Campaign } from '../campaigns/campaign.entity';
import { Click } from '../clicks/click.entity';

@Entity('link')
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.links)
  @JoinColumn({ name: 'product_id' })
  product: Product | { id: string };

  @ManyToOne(() => Campaign, (campaign) => campaign.links)
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign | { id: string };

  @Column()
  short_code: string;

  @Column()
  target_url: string;

  @OneToMany(() => Click, (click) => click.link)
  clicks: Click[];
}
