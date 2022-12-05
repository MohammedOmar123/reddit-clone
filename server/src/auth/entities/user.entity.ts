import { Column, Model, DataType, Table, HasMany } from 'sequelize-typescript';
import { Post } from 'src/post/entities/post.entity';
import { Replay } from 'src/replies/entities/reply.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Like } from '../../likes/entities/like.entity';
@Table
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  bio: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  image: string;

  @HasMany(() => Comment, { onDelete: 'CASCADE' })
  comments: Comment[];

  @HasMany(() => Like, { onDelete: 'CASCADE' })
  likes: Like[];

  @HasMany(() => Post, { onDelete: 'CASCADE' })
  posts: Post[];

  @HasMany(() => Replay, { onDelete: 'CASCADE' })
  replies: Replay[];
}
