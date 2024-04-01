import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Publisher } from './Publisher';

@Entity({ name: 'domain' })
export class Domain {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  desktop_ads_qty: number;

  @Column()
  mobile_ads_qty: number;

  @ManyToOne(() => Publisher, publisher => publisher.domains, { onDelete: 'CASCADE' })
  owner: Publisher;

  @CreateDateColumn()
  created_at: Date;
}

