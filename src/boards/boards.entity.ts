/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../auth/user.entity';
import { BoardStatus } from './boards.model';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne(
    (_type): typeof User => User,
    (user: User): Board[] => user.boards,
    {
      eager: false,
    },
  )
  user: User;
}
