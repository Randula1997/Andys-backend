/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OrderDocument = Orders & Document;

@Schema()
export class Orders {
  @Prop({ required: true })
  vehicleType: string;

  @Prop({ required: true })
  subCategory: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  contactNumber: string;

  @Prop({ required: true })
  date: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'TimeSlot',
    required: true,
  })
  timeSlotId: MongooseSchema.Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Orders);
