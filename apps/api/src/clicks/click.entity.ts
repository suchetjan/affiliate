import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Link } from '../links/link.entity';

@Entity('click')
export class Click {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Link, (link) => link.clicks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'link_id' })
  link: Link | { id: string };

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  timestamp: Date;

  @Column({ nullable: true })
  referrer: string;

  @Column({ nullable: true })
  user_agent: string;
}
