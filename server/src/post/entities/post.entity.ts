import {
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/auth/entities';
import { Comment } from '../../comments/entities';
import { IPost } from '../../interfaces/';
import { Like } from '../../likes/entities';

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

  @HasMany(() => Comment, { onDelete: 'CASCADE' })
  comments: Comment[];

  @HasMany(() => Like, { onDelete: 'CASCADE' })
  likes: Like[];

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
