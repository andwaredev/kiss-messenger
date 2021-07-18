import { Entity, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Message extends BaseEntity {
  @Column()
  text: string;

  @CreateDateColumn({ type: 'datetime' })
  dateSent: Date;

  @ManyToOne(() => User)
  @JoinColumn([{ name: 'senderId' }])
  sender: User;

  @Column()
  senderId: number;

  @ManyToOne(() => User)
  @JoinColumn([{ name: 'recipientId' }])
  recipient: User;

  @Column()
  recipientId: number;
}
