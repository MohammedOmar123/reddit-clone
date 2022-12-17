import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  Model,
  DataType,
} from 'sequelize-typescript';
import { User } from '../../auth/entity';
import { Post } from '../../post/entities';
import { IVote } from 'src/interfaces';

@Table
export class Vote extends Model<IVote> {
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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  vote: number;
}
