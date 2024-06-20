import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TimeSlot } from './timeslot.schema';

export type BookedTimeSlotDocument = BookedTimeSlot & Document;

@Schema()
export class BookedTimeSlot {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TimeSlot', required: true })
  timeSlotId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: false })
  booked: boolean;
}

export const BookedTimeSlotSchema = SchemaFactory.createForClass(BookedTimeSlot);
