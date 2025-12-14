import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Link } from '../links/link.entity';

@Entity('campaign')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  utm_campaign: string;

  @Column({ type: 'timestamptz', nullable: true })
  start_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  end_at: Date | null;

  @OneToMany(() => Link, (link) => link.campaign)
  links: Link[];
}
