import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import { User } from '../../auth/entity/user.entity';
import { Post } from '../../post/entities/post.entity';
import { ILike } from 'src/interfaces';

@Table
export class Like extends Model<ILike> {
  @ForeignKey(() => User)
  @Column({
    primaryKey: true,
  })
  userId: number;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column({
    primaryKey: true,
  })
  postId: number;
  @BelongsTo(() => Post)
  post: Post;
}
