import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
export class CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1, { message: 'Expected positive Id' })
  commentId: number;

  @ValidateIf((ReplayDto: CreateReplyDto) => !Boolean(ReplayDto.commentId))
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'Expected positive Id' })
  @IsOptional()
  replayId: number;
}
