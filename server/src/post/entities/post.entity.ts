import {
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/auth/entity';
import { Comment } from '../../comments/entities';
import { IPost } from '../../interfaces/';
import { Vote } from '../../votes/entities';

@Table
export class Post extends Model<IPost> {
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

  @HasMany(() => Vote)
  votes: Vote[];

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
