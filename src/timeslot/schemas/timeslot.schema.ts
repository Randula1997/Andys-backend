import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Orders } from 'src/order/schemas/order.schema';

export type TimeslotDocument = TimeSlot & Document;


@Schema()
export class TimeSlot {
  @Prop({ required: true })
  startTime: string; 

  @Prop({ required: true })
  endTime: string; 

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Orders' }] })
  orders:  MongooseSchema.Types.ObjectId[];
}

export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);
