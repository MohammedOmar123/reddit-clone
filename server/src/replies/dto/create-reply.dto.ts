import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsOptional()
  commentId: number;

  @IsNumber()
  @IsOptional()
  replayId: number;
}
