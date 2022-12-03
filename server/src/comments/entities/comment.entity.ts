import {
  BelongsTo,
  Table,
  Column,
  DataType,
  ForeignKey,
  Model,
} from 'sequelize-typescript';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/auth/entity/user.entity';
import { IComment } from '../../interfaces/';
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
