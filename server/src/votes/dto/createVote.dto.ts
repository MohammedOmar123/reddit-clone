import { Type } from 'class-transformer';
import { IsIn, IsInt, IsNotIn } from 'class-validator';

export class CreateVoteDto {
  @Type(() => Number)
  @IsIn([1, -1])
  value: string;
}
