import { Column, Model, DataType, Table, HasMany } from 'sequelize-typescript';
import { Post } from 'src/post/entities/post.entity';
import { Replay } from 'src/replies/entities/reply.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Vote } from '../../votes/entities';
@Table
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT,
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

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Vote)
  votes: Vote[];

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Replay)
  replies: Replay[];
}
