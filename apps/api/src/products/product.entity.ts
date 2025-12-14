import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Offer } from '../offers/offer.entity';
import { Link } from '../links/link.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  image_url: string;

  @OneToMany(() => Offer, (offer) => offer.product)
  offers: Offer[];

  @OneToMany(() => Link, (link) => link.product)
  links: Link[];
}
