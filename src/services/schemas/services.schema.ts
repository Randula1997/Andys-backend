/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class VehicleTypePrice {
  @Prop({ required: true })
  vehicleType: string;

  @Prop({ required: true })
  price: number;
}

const VehicleTypePriceSchema = SchemaFactory.createForClass(VehicleTypePrice);

@Schema()
export class Service {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [VehicleTypePriceSchema], required: true })
  vehicleTypePrices: VehicleTypePrice[];

  @Prop()
  description: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
