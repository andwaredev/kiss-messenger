import { Entity, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Message extends BaseEntity {
  @Column()
  text: string;

  @CreateDateColumn({ type: 'datetime' })
  dateSent: Date;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  recipient: User;
}
