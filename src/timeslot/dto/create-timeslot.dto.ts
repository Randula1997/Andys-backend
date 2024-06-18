import { IsString } from 'class-validator';

export class CreateTimeSlotDto {
  @IsString()
  readonly startTime: string;

  @IsString()
  readonly endTime: string;
}
