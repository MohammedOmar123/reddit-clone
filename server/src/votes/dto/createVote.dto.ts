import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  @IsNumber()
  vote: number;
}
