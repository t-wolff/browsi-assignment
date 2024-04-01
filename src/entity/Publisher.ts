import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Domain } from './Domain';

@Entity({ name: 'publisher' })
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Domain, domain => domain.owner)
  domains: Domain[];

  @CreateDateColumn()
  created_at: Date;
}
