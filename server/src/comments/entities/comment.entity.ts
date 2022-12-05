import {
  BelongsTo,
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { Post } from 'src/post/entities';
import { User } from 'src/auth/entity';
import { IComment } from '../../interfaces/';
import { Replay } from '../../replies/entities';
@Table
export class Comment extends Model<IComment> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;
  @HasMany(() => Replay, { onDelete: 'CASCADE' })
  replies: Replay[];

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => Post)
  post: User;
}
