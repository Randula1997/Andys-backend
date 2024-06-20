import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTimeSlotDto {
  @ApiProperty({ description: 'The startTime of timeslot' })
  @IsString()
  readonly startTime: string;

  @ApiProperty({ description: 'The endTime of timeslot' })
  @IsString()
  readonly endTime: string;
}
