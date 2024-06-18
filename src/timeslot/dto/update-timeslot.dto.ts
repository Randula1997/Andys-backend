import { IsString } from 'class-validator';

export class UpdateTimeSlotDto {
  @IsString()
  readonly startTime?: string;

  @IsString()
  readonly endTime?: string;
}
