/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @ApiProperty({ description: 'The status of the order', enum: ['pending', 'accepted', 'cancelled'] })
  @IsString()
  readonly status: string;
}
