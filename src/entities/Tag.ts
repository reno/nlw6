import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { v4 as uuid } from 'uuid';

@Entity('tags')
class Tag {
  @PrimaryColumn()
  readonly id: string;

  @Exclude()
  @Column()
  name: string;

  @Expose({ name: 'name' })
  nameCustom(): string {
    return `#${this.name}`;
  }

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'url' })
  url(): string {
    return `${process.env.BASE_URL}/tags/${this.id}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Tag };