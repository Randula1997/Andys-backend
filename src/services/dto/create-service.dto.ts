/* eslint-disable prettier/prettier */
// create-service.dto.ts
import { IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class VehicleTypePriceDto {
  @ApiProperty({ description: 'The vehicleType of the service' })
  @IsString()
  vehicleType: string;

  @ApiProperty({ description: 'The price of the service' })
  @IsNumber()
  price: number;
}

export class CreateServiceDto {
  @ApiProperty({ description: 'The name of the service' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The vehicleTypePrices of the service' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleTypePriceDto)
  vehicleTypePrices: VehicleTypePriceDto[];

  @ApiProperty({ description: 'The description of the service' })
  @IsString()
  description: string;
}
