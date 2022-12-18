import { Type } from 'class-transformer';
import { IsNumber, IsInt, IsPositive } from 'class-validator';

export class ParamDto {
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  postId?: number;
  id?: number;
}
