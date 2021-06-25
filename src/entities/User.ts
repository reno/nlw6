import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  admin: boolean;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
  
  @Expose({ name: 'url' })
  url(): string {
    return `${process.env.BASE_URL}/users/${this.id}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };