import {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface IUser
  extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  id: CreationOptional<number>;
  username: string;
  email: string;
  password: string;
  image?: string;
  bio?: string;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export interface IPost
  extends Model<InferAttributes<IPost>, InferCreationAttributes<IPost>> {
  id: CreationOptional<number>;
  title: string;
  content: string;
  userId: ForeignKey<IUser['id']>;
  image?: string;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export interface IComment
  extends Model<InferAttributes<IComment>, InferCreationAttributes<IComment>> {
  id: CreationOptional<number>;
  content: string;
  userId: ForeignKey<IUser['id']>;
  postId: ForeignKey<IPost['id']>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export interface IVote
  extends Model<InferAttributes<IVote>, InferCreationAttributes<IVote>> {
  userId: ForeignKey<IUser['id']>;
  postId: ForeignKey<IPost['id']>;
  vote: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}
export interface IReplay
  extends Model<InferAttributes<IReplay>, InferCreationAttributes<IReplay>> {
  id: CreationOptional<number>;
  content: string;
  userId: ForeignKey<IUser['id']>;
  commentId?: ForeignKey<IComment['id']>;
  replayId?: ForeignKey<IReplay['id']>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}
