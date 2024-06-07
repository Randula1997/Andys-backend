/* eslint-disable prettier/prettier */
// create-service.dto.ts
import { IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class VehicleTypePriceDto {
  @IsString()
  vehicleType: string;

  @IsNumber()
  price: number;
}

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleTypePriceDto)
  vehicleTypePrices: VehicleTypePriceDto[];

  @IsString()
  description: string;
}
