import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTimeSlotDto {
  @ApiProperty({ description: 'The startTime of timeslot' })
  @IsString()
  readonly startTime?: string;

  @ApiProperty({ description: 'The endTime of timeslot' })
  @IsString()
  readonly endTime?: string;
}
