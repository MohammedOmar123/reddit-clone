import { Type } from 'class-transformer';
import { IsIn, IsNumber } from 'class-validator';

export class CreateVoteDto {
  @Type(() => Number)
  @IsNumber()
  @IsIn([1, -1])
  vote: number;
}
