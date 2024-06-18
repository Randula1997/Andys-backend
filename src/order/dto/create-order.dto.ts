/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsDate, IsEmail, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsString()
  readonly vehicleType: string;

  @IsString()
  readonly subCategory: string;

  @IsEmail()
  readonly email: string

  @IsString()
  readonly name: string;
  
  @IsNumber() 
  readonly contactNumber: number

  @IsDate()
  @Type(() => Date) 
  readonly date: Date;

  @IsMongoId()
  readonly timeSlotId: string;

}

