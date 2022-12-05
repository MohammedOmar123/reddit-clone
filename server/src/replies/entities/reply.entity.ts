import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/auth/entity';
import { Comment } from '../../comments/entities';
import { IReplay } from '../../../src/interfaces';

@Table
export class Replay extends Model<IReplay> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Comment)
  commentId: number;

  @BelongsTo(() => Comment)
  comment: Comment;

  @ForeignKey(() => Replay)
  replayId: number;

  @BelongsTo(() => Replay)
  replay: Replay;

  @HasMany(() => Replay)
  replies: Replay[];
}
