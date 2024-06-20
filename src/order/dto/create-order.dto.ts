/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsDate, IsEmail, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'The vehicleType of User' })
  @IsString()
  readonly vehicleType: string;

  @ApiProperty({ description: 'The subCategory of User' })
  @IsString()
  readonly subCategory: string;

  @ApiProperty({ description: 'The email of User' })
  @IsEmail()
  readonly email: string

  @ApiProperty({ description: 'The name of User' })
  @IsString()
  readonly name: string;
  
  @ApiProperty({ description: 'The contactNumber of User' })
  @IsNumber() 
  readonly contactNumber: number

  @ApiProperty({ description: 'The date of User' })
  @IsDate()
  @Type(() => Date) 
  readonly date: Date;

  @ApiProperty({ description: 'The timeSlotId of User' })
  @IsMongoId()
  readonly timeSlotId: string;

}

