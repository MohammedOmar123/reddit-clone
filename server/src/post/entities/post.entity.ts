import {
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/auth/entity/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { IPost } from '../../interfaces/';
import { Like } from '../../likes/entities/like.entity';

@Table
export class Post extends Model<IPost> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @HasMany(() => Comment)
  comments: Comment[];
  @HasMany(() => Like)
  likes: Like[];

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
